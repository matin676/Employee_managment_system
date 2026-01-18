import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  TrendingUp,
  Clock,
  AlertCircle,
  Bell,
  LogIn,
  AlertTriangle,
  Info,
} from "lucide-react";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PageContainer } from "@/components/ui/motion";
import Link from "next/link";
import { OverviewCharts } from "@/components/dashboard/overview-charts";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const isEmployee = user.role === "employee";

  if (isEmployee) {
    // --- EMPLOYEE VIEW ---
    interface ExtendedEmployee {
      id: number;
      firstName: string;
      lastName: string;
      dept: string | null;
      projects: {
        pid: number;
        pname: string;
        status: string | null;
        mark: number | null;
        dueDate: string | null;
      }[];
      leaves: {
        token: number;
        start: string;
        end: string;
        reason: string | null;
        leaveType: string;
        status: string | null;
      }[];
      salaryInfo: { base: number; total: number; bonus: number } | null;
    }

    const empId = parseInt(user.id);
    const rawEmployee = await db.employee.findUnique({
      where: { id: empId },
      include: {
        projects: true,
        leaves: { orderBy: { token: "desc" } }, // Fetch all to calc balance
        salaryInfo: true,
      } as Prisma.EmployeeInclude,
    });

    const employee = rawEmployee as unknown as ExtendedEmployee;

    if (!employee) return <div>Employee record not found.</div>;

    const submittedProjects = employee.projects.filter(
      (p) => p.status === "Submitted",
    ).length;
    const totalPoints = employee.projects.reduce(
      (sum, p) => sum + (p.mark || 0),
      0,
    );
    const dueProjects = employee.projects.filter((p) => p.status === "Due");

    // Fetch announcements (top 3)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const announcements = await (db as any).announcement.findMany({
      where: {
        OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 3,
    });

    // Fetch today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todayAttendance = await (db as any).attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId: empId,
          date: today,
        },
      },
    });

    // -- Calculate Leave Balances --
    // Hardcoded Limits (Example)
    const LEAVE_LIMITS: Record<string, number> = {
      "Casual Full": 12,
      Medical: 10,
      Privilege: 15,
      LWP: 999,
    };

    const usedLeaves: Record<string, number> = {};
    const recentLeaves = employee.leaves.slice(0, 5); // Just show top 5 in history table

    // Simple calculation: count days for Approved leaves
    employee.leaves.forEach((l) => {
      if (l.status === "Approved" && l.leaveType) {
        // Assuming single day per entry for simplicity if no date math,
        // BUT realistically we should calc difference.
        // For now, let's treat token count or date diff if easy.
        // Let's rely on simplistic '1 request = 1 day' or similar if start/end logic is complex
        // But we DO have start/end.
        const start = new Date(l.start);
        const end = new Date(l.end);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        // +1 because start==end is 1 day
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        const current = usedLeaves[l.leaveType] || 0;
        usedLeaves[l.leaveType] = current + diffDays;
      }
    });

    return (
      <PageContainer className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome, {employee.firstName}!
          </h2>
        </div>

        {/* Top Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projects Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{submittedProjects}</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalPoints}</div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Department
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold truncate">
                {employee.dept || "N/A"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Attendance Status */}
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Today&apos;s Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayAttendance?.clockIn ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <LogIn className="h-5 w-5" />
                    <span className="font-medium">
                      Clocked in at{" "}
                      {new Date(todayAttendance.clockIn).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </span>
                  </div>
                  {todayAttendance.clockOut && (
                    <p className="text-sm text-muted-foreground">
                      Clocked out at{" "}
                      {new Date(todayAttendance.clockOut).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Not clocked in yet
                  </span>
                  <Link href="/dashboard/attendance">
                    <Button size="sm" className="gap-2">
                      <LogIn className="h-4 w-4" />
                      Clock In
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Announcements Preview */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Latest Announcements
                </CardTitle>
                <Link
                  href="/dashboard/announcements"
                  className="text-xs text-primary hover:underline"
                >
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {announcements.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No announcements
                </p>
              ) : (
                <div className="space-y-2">
                  {announcements.map(
                    (a: {
                      id: number;
                      title: string;
                      priority: string;
                      createdAt: Date;
                    }) => (
                      <div
                        key={a.id}
                        className="flex items-start gap-2 text-sm"
                      >
                        {a.priority === "urgent" ? (
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        ) : a.priority === "important" ? (
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        ) : (
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        )}
                        <span className="truncate">{a.title}</span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Leave Balances Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Leave Balance (Yearly)</h3>
          <div className="grid gap-4 md:grid-cols-4">
            {Object.entries(LEAVE_LIMITS)
              .filter(([k]) => k !== "LWP")
              .map(([type, limit]) => {
                const used = usedLeaves[type] || 0;
                const remaining = Math.max(0, limit - used);
                const percent = Math.min(100, Math.round((used / limit) * 100));

                return (
                  <Card key={type}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {type} Leave
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-2xl font-bold">{remaining}</span>
                        <span className="text-xs text-muted-foreground">
                          / {limit} days
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {used} used
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>

        {/* Due Projects */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Due Projects</h3>
          {dueProjects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dueProjects.map((p) => (
                <Card key={p.pid} className="border-red-200 bg-red-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-red-900">
                      {p.pname}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-red-700">
                      <Clock className="h-4 w-4" />
                      <span>Due: {p.dueDate || "No Date"}</span>
                    </div>
                    <div className="mt-4">
                      {/* Link to project submission page could go here */}
                      <span className="text-xs font-medium px-2 py-1 bg-white rounded border border-red-200">
                        Pending Submission
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No due projects.</p>
          )}
        </div>

        {/* Salary Status - omitted for brevity if unchanged, but included for complete replacement */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Salary Status</h3>
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="h-10 px-4 align-middle font-medium">
                        Base
                      </th>
                      <th className="h-10 px-4 align-middle font-medium">
                        Bonus %
                      </th>
                      <th className="h-10 px-4 align-middle font-medium">
                        Total
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-right">
                        Net Salary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle">
                        ₹{employee.salaryInfo?.base.toLocaleString() || 0}
                      </td>
                      <td className="p-4 align-middle">
                        {employee.salaryInfo?.bonus || 0}%
                      </td>
                      <td className="p-4 align-middle">
                        ₹{employee.salaryInfo?.total.toLocaleString() || 0}
                      </td>
                      <td className="p-4 align-middle text-right font-bold text-green-600">
                        ₹{employee.salaryInfo?.total.toLocaleString() || 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Status */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recent Leave History</h3>
          <Card>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="h-10 px-4 align-middle font-medium">
                        Dates
                      </th>
                      <th className="h-10 px-4 align-middle font-medium">
                        Reason
                      </th>
                      <th className="h-10 px-4 align-middle font-medium">
                        Type
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-right">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentLeaves.length > 0 ? (
                      recentLeaves.map((l) => (
                        <tr key={l.token} className="border-b">
                          <td className="p-4 align-middle">
                            {l.start} - {l.end}
                          </td>
                          <td className="p-4 align-middle max-w-[200px] truncate">
                            {l.reason}
                          </td>
                          <td className="p-4 align-middle">{l.leaveType}</td>
                          <td className="p-4 align-middle text-right">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                l.status === "Approved"
                                  ? "bg-green-100 text-green-800"
                                  : l.status === "Rejected" ||
                                      l.status === "Cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-4 text-center text-muted-foreground"
                        >
                          No leave history.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  } else {
    // --- ADMIN VIEW ---
    // Fetch data for metrics
    const totalEmployees = await db.employee.count();
    const employees = await db.employee.findMany(); // Fetch all to process dep distribution in JS if raw SQL issues

    // Process Department distribution
    const deptCounts: Record<string, number> = {};
    employees.forEach((e) => {
      const d = e.dept || "Unassigned";
      deptCounts[d] = (deptCounts[d] || 0) + 1;
    });
    const deptData = Object.entries(deptCounts).map(([name, value]) => ({
      name,
      value,
    }));

    const totalDepts = Object.keys(deptCounts).length;

    // Fetch Leave statuses
    const leaves = await db.leave.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const leaveStatusData = leaves.map((l) => ({
      name: l.status || "Unknown",
      value: l._count.status,
    }));

    const pendingLeaves =
      leaveStatusData.find((l) => l.name === "Pending")?.value || 0;

    // Fetch today's attendance summary
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const todayAttendanceCount = await (db as any).attendance.count({
      where: {
        date: today,
        clockIn: { not: null },
      },
    });

    // Fetch recent announcements (top 3)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recentAnnouncements = await (db as any).announcement.findMany({
      where: {
        OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
      take: 3,
    });

    return (
      <PageContainer className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>

        {/* Top Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-l-4 border-l-indigo-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Employees
              </CardTitle>
              <Users className="h-4 w-4 text-indigo-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Departments
              </CardTitle>
              <Briefcase className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDepts}</div>
            </CardContent>
          </Card>

          <Link href="/dashboard/leaves">
            <Card className="border-l-4 border-l-amber-500 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Leave Requests
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">
                  {pendingLeaves}
                </div>
                <p className="text-xs text-muted-foreground">Click to review</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/attendance">
            <Card className="border-l-4 border-l-primary shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Today&apos;s Attendance
                </CardTitle>
                <Clock className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {todayAttendanceCount} / {totalEmployees}
                </div>
                <p className="text-xs text-muted-foreground">
                  Employees clocked in
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Announcements & Quick Stats Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Recent Announcements
                </CardTitle>
                <Link
                  href="/dashboard/announcements"
                  className="text-xs text-primary hover:underline"
                >
                  Manage
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentAnnouncements.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No announcements yet
                </p>
              ) : (
                <div className="space-y-2">
                  {recentAnnouncements.map(
                    (a: {
                      id: number;
                      title: string;
                      priority: string;
                      createdAt: Date;
                    }) => (
                      <div
                        key={a.id}
                        className="flex items-start gap-2 text-sm"
                      >
                        {a.priority === "urgent" ? (
                          <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        ) : a.priority === "important" ? (
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                        ) : (
                          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                        )}
                        <span className="truncate">{a.title}</span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Attendance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Present Today
                  </span>
                  <span className="font-bold text-green-600">
                    {todayAttendanceCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Not Clocked In
                  </span>
                  <span className="font-bold text-red-600">
                    {totalEmployees - todayAttendanceCount}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${totalEmployees > 0 ? (todayAttendanceCount / totalEmployees) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  {totalEmployees > 0
                    ? Math.round((todayAttendanceCount / totalEmployees) * 100)
                    : 0}
                  % attendance rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Charts */}
        <OverviewCharts deptData={deptData} leaveStatusData={leaveStatusData} />

        {/* Quick Actions */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/dashboard/employees"
                className="p-4 border rounded-lg hover:bg-slate-50 flex flex-col items-center justify-center gap-2 transition-colors"
              >
                <Users className="h-6 w-6 text-indigo-500" />
                <span className="font-semibold text-sm">Manage Employees</span>
              </Link>
              <Link
                href="/dashboard/projects"
                className="p-4 border rounded-lg hover:bg-slate-50 flex flex-col items-center justify-center gap-2 transition-colors"
              >
                <Briefcase className="h-6 w-6 text-emerald-500" />
                <span className="font-semibold text-sm">Assign Projects</span>
              </Link>
              <Link
                href="/dashboard/salaries"
                className="p-4 border rounded-lg hover:bg-slate-50 flex flex-col items-center justify-center gap-2 transition-colors"
              >
                <AlertCircle className="h-6 w-6 text-pink-500" />
                <span className="font-semibold text-sm">View Payroll</span>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }
}
