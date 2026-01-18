"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const projectSchema = z.object({
  pname: z.string().min(1, "Project name is required"),
  dueDate: z.string().min(1, "Due date is required"),
  employeeId: z.coerce.number().min(1, "Employee is required"),
});

export async function assignProject(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = projectSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Invalid data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    await db.project.create({
      data: {
        pname: data.pname,
        dueDate: data.dueDate,
        employeeId: data.employeeId,
        status: "Due",
        subDate: "Pending", // Default string instead of empty
        mark: 0,
      },
    });
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch {
    return { error: "Failed to assign project" };
  }
}

// Admin grading / marking
// Admin grading / marking
export async function updateProjectStatus(
  pid: number,
  data: { status?: string; mark?: number; subDate?: string },
) {
  try {
    await db.project.update({
      where: { pid },
      data: data,
    });
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch {
    return { error: "Failed to update project" };
  }
}

export async function deleteProject(pid: number) {
  try {
    await db.project.delete({
      where: { pid },
    });
    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch {
    return { error: "Failed to delete project" };
  }
}
