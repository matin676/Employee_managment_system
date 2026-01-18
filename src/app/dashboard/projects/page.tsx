import { ProjectAssignForm } from "@/components/forms/project-assign-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Employee, Project } from "@prisma/client";

import { ProjectActions } from "@/components/dashboard/project-actions";

type ProjectWithEmployee = Project & { employee: Employee | null };

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/");

  const isAdmin = user.role !== "employee";
  const employeeId = !isAdmin ? parseInt(user.id) : undefined;

  let projects: ProjectWithEmployee[] = [];
  let employees: Employee[] = [];

  if (isAdmin) {
    projects = await db.project.findMany({
      include: { employee: true },
      orderBy: { pid: "desc" },
    });
    employees = await db.employee.findMany();
  } else {
    projects = await db.project.findMany({
      where: { employeeId: employeeId },
      include: { employee: true },
      orderBy: { pid: "desc" },
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Project Management
        </h2>
        <div className="flex items-center gap-2">
          {isAdmin && <ProjectAssignForm employees={employees} />}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Stats */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Simple date check could replace this mock */}
            <div className="text-2xl font-bold">
              {projects.filter((p) => p.status === "Due").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter((p) => p.status === "Submitted").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Project Name
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Assigned To
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Due Date
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Submission Date
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Mark/Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.pid}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      {project.pname}
                    </td>
                    <td className="p-4 align-middle">
                      {project.employee
                        ? `${project.employee.firstName} ${project.employee.lastName}`
                        : "Unassigned"}
                    </td>
                    <td className="p-4 align-middle">{project.dueDate}</td>
                    <td className="p-4 align-middle">
                      {project.subDate || "-"}
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          project.status === "Submitted"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <ProjectActions project={project} isAdmin={isAdmin} />
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
