import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { PageContainer } from "@/components/ui/motion";
import { ClockActions } from "@/components/attendance/clock-actions";

interface AttendanceRecord {
  id: number;
  employeeId: number;
  date: Date;
  clockIn: Date | null;
  clockOut: Date | null;
  status: string;
  notes: string | null;
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    dept: string | null;
  };
}

interface TodayAttendance {
  id: number;
  employeeId: number;
  date: Date;
  clockIn: Date | null;
  clockOut: Date | null;
  status: string;
  notes: string | null;
}

export default async function AttendancePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const isAdmin = user.role === "admin";
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isAdmin) {
    // Admin View: Attendance Report
    const attendanceRecords: AttendanceRecord[] = await (db as any).attendance // eslint-disable-line @typescript-eslint/no-explicit-any
      .findMany({
        where: {
          date: {
            gte: new Date(today.getFullYear(), today.getMonth(), 1), // This month
          },
        },
        include: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              dept: true,
            },
          },
        },
        orderBy: [{ date: "desc" }, { employeeId: "asc" }],
      });

    const getStatusBadge = (status: string) => {
      switch (status) {
        case "present":
          return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3" /> Present
            </span>
          );
        case "late":
          return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
              <AlertCircle className="h-3 w-3" /> Late
            </span>
          );
        case "half-day":
          return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Clock className="h-3 w-3" /> Half-Day
            </span>
          );
        default:
          return (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <XCircle className="h-3 w-3" /> Absent
            </span>
          );
      }
    };

    return (
      <PageContainer className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">
            Attendance Report
          </h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>This Month&apos;s Attendance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b">
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Date
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Employee
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Department
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Clock In
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Clock Out
                    </th>
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-4 text-center text-muted-foreground"
                      >
                        No attendance records found.
                      </td>
                    </tr>
                  ) : (
                    attendanceRecords.map((record: AttendanceRecord) => (
                      <tr key={record.id} className="border-b">
                        <td className="p-4 align-middle">
                          {record.date.toLocaleDateString()}
                        </td>
                        <td className="p-4 align-middle font-medium">
                          {record.employee.firstName} {record.employee.lastName}
                        </td>
                        <td className="p-4 align-middle">
                          {record.employee.dept || "N/A"}
                        </td>
                        <td className="p-4 align-middle">
                          {record.clockIn
                            ? record.clockIn.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                        <td className="p-4 align-middle">
                          {record.clockOut
                            ? record.clockOut.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                        <td className="p-4 align-middle">
                          {getStatusBadge(record.status)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    );
  } else {
    // Employee View: Clock In/Out
    const employeeId = parseInt(user.id);
    const todayNormalized = new Date(today);
    todayNormalized.setHours(0, 0, 0, 0);

    const todayAttendance: TodayAttendance | null = await (db as any).attendance // eslint-disable-line @typescript-eslint/no-explicit-any
      .findUnique({
        where: {
          employeeId_date: {
            employeeId,
            date: todayNormalized,
          },
        },
      });

    const isClockedIn = !!todayAttendance?.clockIn;
    const isClockedOut = !!todayAttendance?.clockOut;

    // Get this week's attendance
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const weekAttendance: TodayAttendance[] = await (db as any).attendance // eslint-disable-line @typescript-eslint/no-explicit-any
      .findMany({
        where: {
          employeeId,
          date: {
            gte: weekStart,
            lte: today,
          },
        },
        orderBy: { date: "asc" },
      });

    return (
      <PageContainer className="space-y-6">
        <div className="flex items-center gap-3">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">My Attendance</h2>
        </div>

        {/* Clock Widget */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  Today&apos;s Date
                </p>
                <p className="text-2xl font-bold">
                  {today.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-lg text-muted-foreground mt-1">
                  Current Time:{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <ClockActions
                employeeId={employeeId}
                initialIsClockedIn={isClockedIn}
                initialIsClockedOut={isClockedOut}
                todayAttendance={JSON.parse(JSON.stringify(todayAttendance))}
              />
            </div>
          </CardContent>
        </Card>

        {/* This Week's Summary */}
        <Card>
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (day, index) => {
                  const dayDate = new Date(weekStart);
                  dayDate.setDate(weekStart.getDate() + index);
                  const dayAttendance = weekAttendance.find(
                    (a: TodayAttendance) =>
                      a.date.toDateString() === dayDate.toDateString(),
                  );
                  const isToday =
                    dayDate.toDateString() === today.toDateString();
                  const isFuture = dayDate > today;

                  return (
                    <div
                      key={day}
                      className={`p-3 rounded-lg text-center ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : isFuture
                            ? "bg-muted/30 text-muted-foreground"
                            : dayAttendance?.clockIn
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      <p className="text-xs font-medium">{day}</p>
                      <p className="text-lg font-bold">{dayDate.getDate()}</p>
                      {!isFuture && !isToday && (
                        <p className="text-xs mt-1">
                          {dayAttendance?.clockIn ? "✓" : "✗"}
                        </p>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    );
  }
}
