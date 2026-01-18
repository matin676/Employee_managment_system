"use server";

import { db } from "@/lib/db";
import { employeeSchema } from "@/lib/validations";
import { SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const ALG = "HS256";
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

export type State = {
  error?: string;
  success?: boolean;
  details?: Record<string, string[]>;
} | null;

export async function loginAdmin(prevState: State, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Validate Input
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: "Invalid email or password format" };
  }

  // 2. Check DB
  try {
    const admin = await db.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      // Mock fallback for initial setup if DB is empty
      // WARNING: This is for development only. Remove in production.
      if (email === "admin@example.com" && password === "admin123") {
        // Mock login successful
        const token = await new SignJWT({
          role: "admin",
          email,
          id: "0",
        })
          .setProtectedHeader({ alg: ALG })
          .setExpirationTime("24h")
          .sign(SECRET);

        const cookieStore = await cookies();
        cookieStore.set("session", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        });

        redirect("/dashboard"); // Redirect here for mock user
      } else {
        return { error: "Invalid credentials" };
      }
    } else {
      const passwordsMatch = await bcrypt.compare(password, admin.password);
      if (!passwordsMatch) {
        return { error: "Invalid credentials" };
      }
    }

    // 3. Create Session (JWT)
    const token = await new SignJWT({
      role: "admin",
      email,
      id: admin ? admin.id.toString() : "0",
    })
      .setProtectedHeader({ alg: ALG })
      .setExpirationTime("24h")
      .sign(SECRET);

    // 4. Set Cookie
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NEXT_REDIRECT") {
      throw err;
    }
    return { error: "Something went wrong" };
  }

  redirect("/dashboard");
}

export async function loginEmployee(prevState: State, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Validate Input
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { error: "Invalid email or password format" };
  }

  // 2. Check DB
  try {
    const employee = await db.employee.findUnique({
      where: { email },
    });

    if (!employee) {
      return { error: "Invalid credentials" };
    }

    const passwordsMatch = await bcrypt.compare(password, employee.password);
    if (!passwordsMatch) {
      return { error: "Invalid credentials" };
    }

    // 3. Create Session (JWT)
    const token = await new SignJWT({
      role: "employee",
      email: employee.email,
      id: employee.id.toString(),
    })
      .setProtectedHeader({ alg: ALG })
      .setExpirationTime("24h")
      .sign(SECRET);

    // 4. Set Cookie
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  } catch {
    return { error: "Something went wrong" };
  }

  redirect("/dashboard");
}

export async function createEmployee(prevState: State, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  // Clean up optional empty strings
  if (rawData.password === "") delete rawData.password;

  const parsed = employeeSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Invalid data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    const plainPassword = data.password || "employee123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await db.employee.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        dept: data.dept,
        address: data.address,
        birthday: data.birthday,
        contact: data.contact,
        nid: data.nid,
        gender: data.gender,
        degree: data.degree,
        // Create related Salary record
        salaryInfo: {
          create: {
            base: data.salary,
            total: data.salary,
            bonus: 0,
          },
        },
      },
    });

    revalidatePath("/dashboard/employees");
  } catch {
    return { error: "Failed to create employee" };
  }

  return { success: true };
}

export async function updateEmployee(
  id: number,
  prevState: State,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());

  if (rawData.password === "") delete rawData.password;

  const parsed = employeeSchema.partial().safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Invalid data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const data = parsed.data;

  try {
    const updateData: Prisma.EmployeeUpdateInput = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      dept: data.dept,
      address: data.address,
      birthday: data.birthday,
      contact: data.contact,
      nid: data.nid,
      gender: data.gender,
      degree: data.degree,
      salaryInfo: {
        upsert: {
          create: {
            base: data.salary || 0, // Fallback if missing
            total: data.salary || 0,
            bonus: 0,
          },
          update: {
            base: data.salary,
            total: data.salary,
          },
        },
      },
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await db.employee.update({
      where: { id },
      data: updateData,
    });
    revalidatePath("/dashboard/employees");
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Failed to update employee" };
  }

  return { success: true };
}

export async function deleteEmployee(id: number) {
  try {
    await db.employee.delete({ where: { id } });
    revalidatePath("/dashboard/employees");
  } catch {
    return { error: "Failed to delete" };
  }
}

// Logout Action
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}

// Event Actions
import { eventSchema } from "@/lib/validations";

export async function createEvent(prevState: State, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const parsed = eventSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Invalid data",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any).event.create({
      data: {
        title: parsed.data.title,
        date: new Date(parsed.data.date),
        type: parsed.data.type,
        description: parsed.data.description,
      },
    });
    revalidatePath("/dashboard/calendar");
  } catch (error) {
    console.error("Create Event Error:", error);
    // Verified: db.event exists after migration
    return { error: "Failed to create event" };
  }
  return { success: true };
}

// ==================== ANNOUNCEMENTS ====================

export async function createAnnouncement(prevState: State, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const priority = (formData.get("priority") as string) || "normal";
  const expiresAt = formData.get("expiresAt") as string;

  if (!title || !content) {
    return { error: "Title and content are required" };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any).announcement.create({
      data: {
        title,
        content,
        priority,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        createdBy: "Admin",
      },
    });
    revalidatePath("/dashboard/announcements");
    revalidatePath("/dashboard");
  } catch {
    return { error: "Failed to create announcement" };
  }
  return { success: true };
}

export async function deleteAnnouncement(id: number) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any).announcement.delete({
      where: { id },
    });
    revalidatePath("/dashboard/announcements");
    revalidatePath("/dashboard");
  } catch {
    return { error: "Failed to delete announcement" };
  }
  return { success: true };
}

export async function getAnnouncements() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const announcements = await (db as any).announcement.findMany({
      where: {
        OR: [{ expiresAt: null }, { expiresAt: { gte: new Date() } }],
      },
      orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    });
    return announcements;
  } catch (error) {
    console.error("Get Announcements Error:", error);
    return [];
  }
}

// ==================== ATTENDANCE ====================

/**
 * Normalizes the current date to 00:00:00.000 local time
 * This ensures consistency when querying @db.Date fields.
 */
function getNormalizedToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export async function clockIn(employeeId: number) {
  const today = getNormalizedToday();

  try {
    // Check if already clocked in today using the compound unique key
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (db as any).attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
    });

    if (existing?.clockIn) {
      return { error: "Already clocked in today" };
    }

    const now = new Date();
    const isLate = now.getHours() >= 10; // Late if after 10 AM

    try {
      if (existing) {
        // Update existing record (e.g., if there was a record without clockIn)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (db as any).attendance.update({
          where: { id: existing.id },
          data: {
            clockIn: now,
            status: isLate ? "late" : "present",
          },
        });
      } else {
        // Create new record
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (db as any).attendance.create({
          data: {
            employeeId,
            date: today,
            clockIn: now,
            status: isLate ? "late" : "present",
          },
        });
      }
    } catch (e: unknown) {
      const error = e as { code?: string };
      // Handle P2002 if a concurrent request created the record
      if (error.code === "P2002") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const concurrent = await (db as any).attendance.findUnique({
          where: {
            employeeId_date: {
              employeeId,
              date: today,
            },
          },
        });
        if (concurrent?.clockIn) {
          return { error: "Already clocked in today" };
        }
        // If it exists but has no clockIn, update it
        if (concurrent) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (db as any).attendance.update({
            where: { id: concurrent.id },
            data: {
              clockIn: now,
              status: isLate ? "late" : "present",
            },
          });
        }
      } else {
        throw e;
      }
    }

    revalidatePath("/dashboard/attendance");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Clock In Error:", error);
    return { error: "Failed to clock in" };
  }
  return { success: true };
}

export async function clockOut(employeeId: number) {
  const today = getNormalizedToday();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existing = await (db as any).attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
    });

    if (!existing?.clockIn) {
      return { error: "Not clocked in yet" };
    }

    if (existing.clockOut) {
      return { error: "Already clocked out today" };
    }

    const now = new Date();
    const clockInTime = new Date(existing.clockIn);
    const hoursWorked =
      (now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60);

    // Mark as half-day if less than 4 hours
    const status = hoursWorked < 4 ? "half-day" : existing.status;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db as any).attendance.update({
      where: { id: existing.id },
      data: {
        clockOut: now,
        status,
      },
    });

    revalidatePath("/dashboard/attendance");
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Clock Out Error:", error);
    return { error: "Failed to clock out" };
  }
  return { success: true };
}

export async function getTodayAttendance(employeeId: number) {
  const today = getNormalizedToday();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attendance = await (db as any).attendance.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
    });
    return attendance;
  } catch {
    return null;
  }
}

export async function getAttendanceReport(startDate?: Date, endDate?: Date) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {};

    if (startDate && endDate) {
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attendance = await (db as any).attendance.findMany({
      where,
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
    return attendance;
  } catch (error) {
    console.error("Get Attendance Report Error:", error);
    return [];
  }
}
