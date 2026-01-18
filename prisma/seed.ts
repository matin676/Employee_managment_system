import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: adminPassword,
    },
  });
  console.log({ admin });

  // Create Employee
  const employeePassword = await bcrypt.hash("employee123", 10);
  const employee = await prisma.employee.upsert({
    where: { email: "employee@example.com" },
    update: {},
    create: {
      firstName: "John",
      lastName: "Doe",
      email: "employee@example.com",
      password: employeePassword,
      dept: "Engineering",
      rank: {
        create: {
          points: 0,
        },
      },
      salaryInfo: {
        create: {
          // Will be overwritten by nested create logic usually, but here checking schema
          // Actually, salary id shares with employee id.
          // Doing it separately might be safer or nested.
          base: 50000,
          total: 50000,
          bonus: 0,
        },
      },
    },
  });

  // Note: Nested create might fail if ID sharing logic is strict.
  // The schema says Salary.id is @id but not autoincrement, generic one-to-one.
  // Employee is autoincrement.
  // Let's rely on Prisma to handle the nested create or do it in two steps if needed.
  // But wait, Employee id is unknown until created.
  // The nested `salaryInfo: { create: ... }` should handle passing the ID if configured correctly (relation).
  // In `schema.prisma`:
  // model Salary { id Int @id ... employee Employee @relation(fields: [id], references: [id]) }
  // This means Salary.id == Employee.id.
  // Nested create should work.

  console.log({ employee });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
