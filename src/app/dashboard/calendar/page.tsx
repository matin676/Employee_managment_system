import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { CalendarView } from "@/components/calendar/calendar-view";

export default async function CalendarPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const isEmployee = user.role === "employee";
  const isAdmin = user.role === "admin";

  // Fetch Events (Holidays, Meetings)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const events = await (db as any).event.findMany({
    orderBy: { date: "asc" },
  });

  // Fetch Leaves
  let leaves;
  if (isEmployee) {
    leaves = await db.leave.findMany({
      where: { employeeId: parseInt(user.id) },
    });
  } else {
    // Admin sees all leaves
    leaves = await db.leave.findMany({
      include: { employee: { select: { firstName: true, lastName: true } } },
    });
  }

  // Serialize dates/decimals for client component if necessary
  // Prisma Dates are Date objects, which verify-prisma says are fine passed to client components in Next.js 13+ usually,
  // but sometimes need serialization. Let's pass them as is for now.

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
      </div>
      <CalendarView isAdmin={isAdmin} events={events} leaves={leaves} />
    </div>
  );
}
