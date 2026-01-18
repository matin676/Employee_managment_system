"use client";

import { deleteLeave, updateLeaveStatus } from "@/lib/actions-leave";
import { Button } from "../ui/button";
import { Check, X, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

interface LeaveActionsProps {
  token: number;
  status: string;
  isEmployee: boolean;
}

export function LeaveActions({ token, status, isEmployee }: LeaveActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatusUpdate = (newStatus: string) => {
    startTransition(async () => {
      try {
        const result = await updateLeaveStatus(token, newStatus);
        if (result.success) {
          toast.success(`Leave request ${newStatus.toLowerCase()}`);
          router.refresh();
        } else {
          toast.error(result.error || "Failed to update status");
        }
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to cancel/delete this leave request?")) {
      startTransition(async () => {
        try {
          const result = await deleteLeave(token);
          if (result.success) {
            toast.success("Leave request cancelled");
            router.refresh();
          } else {
            toast.error(result.error || "Failed to delete leave request");
          }
        } catch {
          toast.error("An unexpected error occurred");
        }
      });
    }
  };

  if (isEmployee) {
    // Employees can only delete pending requests
    return status === "Pending" ? (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        title="Cancel Request"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    ) : null;
  }

  // Admin Actions
  if (status !== "Pending") return null;

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleStatusUpdate("Approved")}
        disabled={isPending}
        className="text-green-600 hover:text-green-700 hover:bg-green-50"
        title="Approve"
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleStatusUpdate("Rejected")}
        disabled={isPending}
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        title="Reject"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
