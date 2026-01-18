import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { Medal, Trophy } from "lucide-react";
import { Prisma } from "@prisma/client";

export default async function RankingPage() {
  // Option 1: Use the legacy 'Rank' table if we were maintaining it.
  // Option 2: Dynamically calculate based on project marks (Better for consistency).

  // Define types to avoid 'any'
  interface Project {
    mark: number;
    status: string | null;
  }

  interface EmployeeWithProjects {
    id: number;
    firstName: string;
    lastName: string;
    projects: Project[];
  }

  // Let's fetch employees with their projects to calculate scores.
  const rawEmployees = await db.employee.findMany({
    include: { projects: true } as Prisma.EmployeeInclude,
  });

  const employees = rawEmployees as unknown as EmployeeWithProjects[];

  // Calculate score: Sum of marks from all submitted projects
  const leaderboard = employees
    .map((emp) => {
      const points = emp.projects.reduce((sum, p) => sum + (p.mark || 0), 0);
      return { ...emp, points };
    })
    .sort((a, b) => b.points - a.points); // Sort descending

  const topPerformer = leaderboard[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Leaderboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">
              Top Performer
            </CardTitle>
            <Trophy className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">
              {topPerformer
                ? `${topPerformer.firstName} ${topPerformer.lastName}`
                : "No Data"}
            </div>
            <p className="text-xs text-amber-700 mt-1">
              {topPerformer ? `${topPerformer.points} Points` : ""}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employee Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground w-[100px]">
                    Rank
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Employee
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Projects Completed
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Total Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((emp, index) => (
                  <tr
                    key={emp.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle font-bold text-lg text-slate-500">
                      {index === 0 ? (
                        <Medal className="text-amber-500 inline mr-2" />
                      ) : index === 1 ? (
                        <Medal className="text-slate-400 inline mr-2" />
                      ) : index === 2 ? (
                        <Medal className="text-amber-700 inline mr-2" />
                      ) : (
                        `#${index + 1}`
                      )}
                    </td>
                    <td className="p-4 align-middle font-medium">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="p-4 align-middle">
                      {
                        emp.projects.filter(
                          (p) =>
                            p.status === "Submitted" || p.status === "Marked",
                        ).length
                      }
                    </td>
                    <td className="p-4 align-middle text-right font-bold text-indigo-600">
                      {emp.points}
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
