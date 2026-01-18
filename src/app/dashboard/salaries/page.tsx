import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { DollarSign, TrendingUp } from "lucide-react";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SalaryPage() {
  const user = await getCurrentUser();
  if (user?.role !== "admin" && user?.role !== "employee") {
    redirect("/dashboard");
  }

  // If employee, only fetch their own salary
  const isEmployee = user.role === "employee";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let employees: any[];

  if (isEmployee) {
    if (user.id) {
      employees = await db.employee.findMany({
        where: { id: parseInt(user.id) },
        include: { salaryInfo: true },
      });
    } else {
      employees = [];
    }
  } else {
    employees = await db.employee.findMany({
      include: { salaryInfo: true },
    });
  }

  // Calculate total payroll
  const totalPayroll = employees.reduce(
    (acc, emp) => acc + (emp.salaryInfo?.total || 0),
    0,
  );
  const avgSalary =
    employees.length > 0 ? Math.round(totalPayroll / employees.length) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Salary Management</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Payroll (Monthly)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalPayroll.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{avgSalary.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Salaries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Employee
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Base Salary
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Bonus
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Total
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      <div>
                        {emp.firstName} {emp.lastName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {emp.dept}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      ₹{emp.salaryInfo?.base.toLocaleString() || 0}
                    </td>
                    <td className="p-4 align-middle text-green-600">
                      +₹{emp.salaryInfo?.bonus.toLocaleString() || 0}
                    </td>
                    <td className="p-4 align-middle text-right font-bold">
                      ₹{emp.salaryInfo?.total.toLocaleString() || 0}
                    </td>
                    <td className="p-4 align-middle text-right">
                      {/* Placeholder for Pay Slip generation */}
                      <Link
                        href={`/dashboard/salaries/${emp.id}/slip`}
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        View Slip
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
