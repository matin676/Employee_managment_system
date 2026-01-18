"use client";

import { deleteProject, updateProjectStatus } from "@/lib/actions-project";
import { Button } from "../ui/button";
import { Trash2, Edit, CheckCircle } from "lucide-react";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Project } from "@prisma/client";

interface ProjectActionsProps {
  project: Project;
  isAdmin: boolean;
}

export function ProjectActions({ project, isAdmin }: ProjectActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Edit State
  const [mark, setMark] = useState(project.mark || 0);
  const [status, setStatus] = useState(project.status || "Due");

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this project?")) {
      startTransition(async () => {
        await deleteProject(project.pid);
        router.refresh();
      });
    }
  };

  const handleUpdate = () => {
    startTransition(async () => {
      await updateProjectStatus(project.pid, {
        mark: parseInt(mark.toString()),
        status,
      });
      setOpen(false);
      router.refresh();
    });
  };

  const handleFunction = () => {
    const today = new Date().toISOString().split("T")[0];
    startTransition(async () => {
      await updateProjectStatus(project.pid, {
        status: "Submitted",
        subDate: today,
      });
      router.refresh();
    });
  };

  // Employee View: Can only submit if Due
  if (!isAdmin) {
    return project.status === "Due" ? (
      <Button
        size="sm"
        variant="outline"
        onClick={handleFunction}
        disabled={isPending}
        className="text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
      >
        <CheckCircle className="mr-2 h-4 w-4" /> Submit
      </Button>
    ) : (
      <span className="text-xs text-muted-foreground">No actions</span>
    );
  }

  // Admin View
  return (
    <>
      <div className="flex items-center justify-end gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isPending}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project Status</DialogTitle>
            <DialogDescription>
              Update the mark and status for this project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mark" className="text-right">
                Mark
              </Label>
              <Input
                id="mark"
                type="number"
                value={mark}
                onChange={(e) => {
                  const val = e.target.value;
                  setMark(val === "" ? 0 : parseInt(val));
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Due">Due</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Marked">Marked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdate} disabled={isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
