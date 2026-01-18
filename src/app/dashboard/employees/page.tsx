import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { EmployeeForm } from "@/components/forms/employee-form";

import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

import { EmployeeActions } from "@/components/employees/employee-actions";

export default async function EmployeesPage() {
  const user = await getCurrentUser();
  if (user?.role !== "admin") {
    redirect("/dashboard");
  }

  const employees = await db.employee.findMany({
    include: { salaryInfo: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
        <EmployeeForm />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    ID
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Department
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Joined
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {employees.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No employees found. Click &quot;Add Employee&quot; to
                      start.
                    </td>
                  </tr>
                ) : (
                  employees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4 align-middle">{emp.id}</td>
                      <td className="p-4 align-middle font-medium">
                        {emp.firstName} {emp.lastName}
                      </td>
                      <td className="p-4 align-middle">{emp.dept || "-"}</td>
                      <td className="p-4 align-middle">{emp.email}</td>
                      <td className="p-4 align-middle">
                        {new Date(emp.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle text-right">
                        <EmployeeActions employee={emp} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
