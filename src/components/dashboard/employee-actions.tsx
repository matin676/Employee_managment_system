"use client";

import { EmployeeForm } from "@/components/forms/employee-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteEmployee } from "@/lib/actions";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Employee } from "@prisma/client";

interface EmployeeActionsProps {
  employee: Employee;
}

export function EmployeeActions({ employee }: EmployeeActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {/* Edit Trigger - Wraps the MenuItem in functionality or works via the Dialog */}
        <EmployeeForm
          initialData={employee}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
          }
        />

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => {
            if (confirm("Are you sure?")) {
              await deleteEmployee(employee.id);
            }
          }}
          className="text-red-600 focus:text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
