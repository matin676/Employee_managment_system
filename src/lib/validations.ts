import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  dept: z.string().min(1, "Department is required"),
  rank: z.string().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
  salary: z.coerce.number().min(0, "Salary must be positive"),
  address: z.string().optional(),
  birthday: z.string().optional(),
  contact: z.string().optional(),
  nid: z.string().optional(),
  gender: z.string().optional(),
  degree: z.string().optional(),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  type: z.enum(["holiday", "meeting"]),
  description: z.string().optional(),
});

export type EventFormValues = z.infer<typeof eventSchema>;
