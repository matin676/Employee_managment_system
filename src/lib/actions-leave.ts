"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const leaveSchema = z.object({
  employeeId: z.coerce.number(),
  start: z.string().min(1, "Start date is required"),
  end: z.string().min(1, "End date is required"),
  reason: z.string().min(1, "Reason is required"),
  leaveType: z.string().min(1, "Leave type is required"),
});

export async function applyForLeave(prevState: unknown, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  const parsed = leaveSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Invalid data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    await db.leave.create({
      data: {
        employeeId: data.employeeId,
        start: data.start,
        end: data.end,
        reason: data.reason,
        leaveType: data.leaveType,
        status: "Pending",
        cutSalary: 0,
      },
    });

    revalidatePath("/dashboard/leaves"); // or wherever the list is
  } catch {
    return { error: "Failed to apply for leave" };
  }

  return { success: true };
}

// Admin Actions
// Admin Actions
export async function updateLeaveStatus(token: number, status: string) {
  try {
    await db.leave.update({
      where: { token },
      data: { status },
    });
    revalidatePath("/dashboard/leaves");
    return { success: true };
  } catch {
    return { error: "Failed to update status" };
  }
}

export async function deleteLeave(token: number) {
  try {
    await db.leave.delete({
      where: { token },
    });
    revalidatePath("/dashboard/leaves");
    return { success: true };
  } catch {
    return { error: "Failed to delete leave request" };
  }
}
