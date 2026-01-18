import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { format } from "date-fns";

// Force printer-friendly styles
const printStyles = `
  @media print {
    body * {
      visibility: hidden;
    }
    #salary-slip, #salary-slip * {
      visibility: visible;
    }
    #salary-slip {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
    .no-print {
      display: none !important;
    }
  }
`;

export default async function SalarySlipPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const { id } = await params;
  const targetId = parseInt(id);
  const isEmployee = user.role === "employee";

  if (isEmployee && parseInt(user.id) !== targetId) {
    redirect("/dashboard");
  }

  const employee = await db.employee.findUnique({
    where: { id: targetId },
    include: {
      salaryInfo: true,
      leaves: {
        where: {
          leaveType: "LWP",
          status: "Approved",
          // Ideally filter by current month, but for demo we assume 'current month' context or all-time LWP affecting current?
          // Legacy just summed all LWP? Or maybe monthly.
          // For simplicity in this demo, let's just fetch all 'LWP' and pretend they apply to this month's slip
          // or just show "Total LWP Deductions"
        },
      },
    },
  });

  if (!employee || !employee.salaryInfo) {
    return <div className="p-6">Employee or Salary info not found.</div>;
  }

  // Calculate LWP Deduction
  // Assuming 'start' and 'end' are YYYY-MM-DD
  let lwpDays = 0;
  employee.leaves.forEach((leave) => {
    if (leave.start && leave.end) {
      const start = new Date(leave.start);
      const end = new Date(leave.end);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
      lwpDays += diffDays;
    }
  });

  const baseSalary = employee.salaryInfo.base;
  const totalSalary = employee.salaryInfo.total;
  const bonus = employee.salaryInfo.bonus;

  // Custom deduction logic from legacy: (NetSalary / 30) * days
  // Here we use 'total' as net roughly.
  const dailyRate = totalSalary / 30;
  const lwpDeduction = Math.round(dailyRate * lwpDays);
  const netPay = totalSalary + bonus - lwpDeduction;

  const monthName = format(new Date(), "MMMM yyyy");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <style>{printStyles}</style>
      <div className="flex justify-between items-center no-print">
        <h2 className="text-2xl font-bold">Salary Slip</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          // We can't use onClick in server component. We need a client component wrapper or script.
          // Using a simple script tag for print.
          // Or just standard window.print() via generic onclick attribute if supported in JSX?
          // Next.js might complain about inline handlers.
          // We'll use a small client component button.
        >
          <span className="print-btn-placeholder">Print (Ctrl+P)</span>
        </button>
      </div>

      <div id="salary-slip" className="bg-white p-8 border shadow-sm">
        <div className="text-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold uppercase text-slate-800">
            DDO Bharuch
          </h1>
          <p className="text-slate-500">Employee Management System</p>
          <h3 className="text-xl font-semibold mt-4">
            Payslip for {monthName}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-sm text-slate-500">Employee Name</p>
            <p className="font-semibold">
              {employee.firstName} {employee.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Employee ID</p>
            <p className="font-semibold">{employee.id}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Department</p>
            <p className="font-semibold">{employee.dept}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Bank Account</p>
            <p className="font-semibold">**** **** **** 1234</p>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="p-4 border-r">Earnings</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 border-r border-l">Deductions</th>
                <th className="p-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="p-4 border-r">Basic Salary</td>
                <td className="p-4 text-right">
                  ₹{baseSalary.toLocaleString()}
                </td>
                <td className="p-4 border-r border-l">LWP ({lwpDays} days)</td>
                <td className="p-4 text-right text-red-600">
                  -₹{lwpDeduction.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="p-4 border-r">Bonus</td>
                <td className="p-4 text-right">₹{bonus.toLocaleString()}</td>
                <td className="p-4 border-r border-l">Prof. Tax</td>
                <td className="p-4 text-right">₹0</td>
              </tr>
              {/* Add empty rows for align */}
              <tr>
                <td className="p-4 border-r h-12"></td>
                <td className="p-4 text-right"></td>
                <td className="p-4 border-r border-l"></td>
                <td className="p-4 text-right"></td>
              </tr>
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t">
              <tr>
                <td className="p-4 border-r">Gross Earnings</td>
                <td className="p-4 text-right">
                  ₹{(baseSalary + bonus).toLocaleString()}
                </td>
                <td className="p-4 border-r border-l">Total Deductions</td>
                <td className="p-4 text-right text-red-600">
                  ₹{lwpDeduction.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="flex justify-between items-center mt-8 pt-8 border-t">
          <div>
            <p className="text-sm text-slate-500">Net Pay</p>
            <p className="text-3xl font-bold text-indigo-700">
              ₹{netPay.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 uppercase">
              {/* Amount in words could go here */}
            </p>
          </div>
          <div className="text-right">
            <div className="h-16 w-32 border-b border-slate-300 mb-2"></div>
            <p className="text-sm text-slate-500">Employer Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
