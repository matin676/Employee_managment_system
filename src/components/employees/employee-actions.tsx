"use client";

import { deleteEmployee } from "@/lib/actions";
import { EmployeeForm } from "../forms/employee-form";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

import { Employee } from "@prisma/client";

interface EmployeeActionsProps {
  employee: Employee;
}

export function EmployeeActions({ employee }: EmployeeActionsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this employee?")) {
      startTransition(async () => {
        await deleteEmployee(employee.id);
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <EmployeeForm
        initialData={employee}
        trigger={
          <Button
            variant="ghost"
            size="sm"
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          >
            Edit
          </Button>
        }
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        {isPending ? "..." : <Trash2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
