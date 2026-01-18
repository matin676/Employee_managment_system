import { LeaveForm } from "@/components/forms/leave-form";
import { LeaveActions } from "@/components/dashboard/leave-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/ui/motion";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LeavePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const isEmployee = user.role === "employee";
  const employeeId = isEmployee ? parseInt(user.id) : undefined;

  let leaves;
  if (isEmployee) {
    leaves = await db.leave.findMany({
      where: { employeeId: employeeId },
      include: { employee: true },
      orderBy: { token: "desc" },
    });
  } else {
    leaves = await db.leave.findMany({
      include: { employee: true },
      orderBy: { token: "desc" },
    });
  }

  return (
    <PageContainer className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          {isEmployee ? "My Leaves" : "Leave Management"}
        </h2>

        {isEmployee && employeeId && <LeaveForm employeeId={employeeId} />}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaves.filter((l) => l.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaves.filter((l) => l.status === "Approved").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
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
                    Type
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Dates
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Reason
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    {!isEmployee && "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr
                    key={leave.token}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      {leave.employee.firstName} {leave.employee.lastName}
                    </td>
                    <td className="p-4 align-middle">{leave.leaveType}</td>
                    <td className="p-4 align-middle">
                      {leave.start} - {leave.end}
                    </td>
                    <td
                      className="p-4 align-middle max-w-[200px] truncate"
                      title={leave.reason || ""}
                    >
                      {leave.reason}
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : leave.status === "Cancelled" ||
                                leave.status === "Rejected" // Check matches legacy Cancelled
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end">
                        <LeaveActions
                          token={leave.token}
                          status={leave.status || "Pending"}
                          isEmployee={isEmployee}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
