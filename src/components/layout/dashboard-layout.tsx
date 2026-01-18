import {
  Banknote,
  Bell,
  Briefcase,
  Calendar,
  CalendarDays,
  Clock,
  LayoutDashboard,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { LogoutButton } from "@/components/layout/logout-button";
import { db } from "@/lib/db";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser();
  const isEmployee = user?.role === "employee";

  let employeeProfile = null;
  if (isEmployee && user?.id) {
    employeeProfile = await db.employee.findUnique({
      where: { id: parseInt(user.id) },
      select: { pic: true, firstName: true },
    });
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-border bg-slate-900 text-white transition-transform md:translate-x-0">
        <div className="flex h-16 items-center border-b border-slate-800 px-6">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <h2 className="text-lg font-bold tracking-tight">DDO Bharuch</h2>
          </Link>
        </div>

        <div className="py-4">
          <nav className="space-y-1 px-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
            {!isEmployee && (
              <Link
                href="/dashboard/employees"
                className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <Users size={20} />
                Employees
              </Link>
            )}
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Briefcase size={20} />
              {isEmployee ? "My Projects" : "Projects"}
            </Link>
            <Link
              href="/dashboard/leaves"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <CalendarDays size={20} />
              {isEmployee ? "My Leaves" : "Leaves"}
            </Link>
            <Link
              href="/dashboard/calendar"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Calendar size={20} />
              Calendar
            </Link>
            <Link
              href="/dashboard/salaries"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Banknote size={20} />
              {isEmployee ? "My Salary" : "Salaries"}
            </Link>
            <Link
              href="/dashboard/ranking"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Trophy size={20} />
              Ranking
            </Link>
            <Link
              href="/dashboard/announcements"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Bell size={20} />
              Announcements
            </Link>
            <Link
              href="/dashboard/attendance"
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <Clock size={20} />
              {isEmployee ? "My Attendance" : "Attendance"}
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-4 w-full px-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
          <h1 className="text-xl font-semibold text-foreground">Overview</h1>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/profile">
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold transition-transform hover:scale-105 cursor-pointer overflow-hidden border border-indigo-200">
                {employeeProfile?.pic ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={`/process/${employeeProfile.pic}`}
                      alt="Profile"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <span>
                    {isEmployee
                      ? employeeProfile?.firstName?.charAt(0) || "E"
                      : "A"}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
