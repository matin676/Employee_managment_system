"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, CheckCircle, Loader2 } from "lucide-react";
import { clockIn, clockOut } from "@/lib/actions";
import { toast } from "sonner";

interface AttendanceRecord {
  clockIn?: string | Date | null;
  clockOut?: string | Date | null;
}

interface ClockActionsProps {
  employeeId: number;
  initialIsClockedIn: boolean;
  initialIsClockedOut: boolean;
  todayAttendance: AttendanceRecord | null;
}

export function ClockActions({
  employeeId,
  initialIsClockedIn,
  initialIsClockedOut,
  todayAttendance,
}: ClockActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClockedIn, setIsClockedIn] = useState(initialIsClockedIn);
  const [isClockedOut, setIsClockedOut] = useState(initialIsClockedOut);

  const handleClockIn = async () => {
    setIsLoading(true);
    try {
      const result = await clockIn(employeeId);
      if (result?.success) {
        toast.success("Clocked in successfully!");
        setIsClockedIn(true);
      } else {
        toast.error(result?.error || "Failed to clock in");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    try {
      const result = await clockOut(employeeId);
      if (result?.success) {
        toast.success("Clocked out successfully!");
        setIsClockedOut(true);
      } else {
        toast.error(result?.error || "Failed to clock out");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isClockedIn && isClockedOut) {
    return (
      <div className="text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
        <p className="mt-2 font-medium text-green-700">Completed for today!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {!isClockedIn ? (
        <Button
          size="lg"
          className="gap-2 bg-green-600 hover:bg-green-700"
          onClick={handleClockIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogIn className="h-5 w-5" />
          )}
          Clock In
        </Button>
      ) : (
        <Button
          size="lg"
          variant="destructive"
          className="gap-2"
          onClick={handleClockOut}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
          Clock Out
        </Button>
      )}

      {todayAttendance && (
        <div className="text-sm text-muted-foreground text-center">
          {todayAttendance.clockIn && (
            <p>
              Clocked in at:{" "}
              {new Date(todayAttendance.clockIn).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
          {todayAttendance.clockOut && (
            <p>
              Clocked out at:{" "}
              {new Date(todayAttendance.clockOut).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
