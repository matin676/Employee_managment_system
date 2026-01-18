"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEvent } from "@/lib/actions";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalendarViewProps {
  isAdmin: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leaves: any[];
}

export function CalendarView({ isAdmin, events, leaves }: CalendarViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  async function handleCreateEvent(formData: FormData) {
    const res = await createEvent(null, formData);
    if (res?.success) {
      setIsDialogOpen(false);
    } else {
      alert("Error creating event");
    }
  }

  // Hardcoded Indian National Holidays 2025/2026 for demo
  const nationalHolidays = [
    {
      date: new Date(2025, 0, 26),
      title: "Republic Day",
      type: "holiday",
      id: "nat-1",
    },
    {
      date: new Date(2025, 2, 14),
      title: "Holi",
      type: "holiday",
      id: "nat-2",
    },
    {
      date: new Date(2025, 7, 15),
      title: "Independence Day",
      type: "holiday",
      id: "nat-3",
    },
    {
      date: new Date(2025, 9, 2),
      title: "Gandhi Jayanti",
      type: "holiday",
      id: "nat-4",
    },
    {
      date: new Date(2025, 9, 20),
      title: "Diwali",
      type: "holiday",
      id: "nat-5",
    },
    {
      date: new Date(2025, 11, 25),
      title: "Christmas",
      type: "holiday",
      id: "nat-6",
    },
    // 2026
    {
      date: new Date(2026, 0, 26),
      title: "Republic Day",
      type: "holiday",
      id: "nat-7",
    },
  ];

  // Merge events with national holidays for display
  const allEvents = [
    ...events,
    ...nationalHolidays.map((h) => ({
      ...h,
      id: h.id || `nat-${h.date.getTime()}`,
    })),
  ];

  const selectedDayEvents = date
    ? allEvents.filter(
        (e) =>
          new Date(e.date).toISOString().split("T")[0] ===
          date.toISOString().split("T")[0],
      )
    : [];

  const selectedDayLeaves = date
    ? leaves.filter((l) => {
        const start = new Date(l.start);
        const end = new Date(l.end);
        return date >= start && date <= end;
      })
    : [];

  const currentYear = new Date().getFullYear();
  const fromDate = new Date(currentYear, 0, 1);
  const toDate = new Date(currentYear, 11, 31);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Calendar {currentYear}</CardTitle>
          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <form action={handleCreateEvent} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" required />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" required defaultValue="holiday">
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="holiday">Holiday</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" name="description" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="p-4 border rounded-xl bg-linear-to-br from-background to-muted/30 w-full flex justify-center shadow-inner">
            <DayPicker
              mode="single"
              showOutsideDays={false}
              selected={date}
              onSelect={setDate}
              fromDate={fromDate}
              toDate={toDate}
              modifiers={{
                event: (d) =>
                  allEvents.some(
                    (e) => new Date(e.date).toDateString() === d.toDateString(),
                  ),
                leave: (d) =>
                  leaves.some((l) => {
                    const start = new Date(l.start);
                    const end = new Date(l.end);
                    return d >= start && d <= end;
                  }),
                weekend: { dayOfWeek: [0, 6] },
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "700",
                  color: "#dc2626",
                  backgroundColor: "#fef2f2",
                  borderRadius: "8px",
                },
                leave: {
                  color: "#2563eb",
                  fontWeight: "700",
                  backgroundColor: "#eff6ff",
                  borderRadius: "8px",
                },
                weekend: { color: "#9ca3af" },
                selected: {
                  backgroundColor: "#6366f1",
                  color: "white",
                  borderRadius: "8px",
                },
              }}
              classNames={{
                day: "rounded-lg transition-all duration-150 hover:bg-primary/10 hover:scale-105",
                today: "bg-primary/20 font-bold",
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Details for {date?.toDateString()}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Events & Holidays</h3>
            {selectedDayEvents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events</p>
            ) : (
              <ul className="space-y-2">
                {selectedDayEvents.map((e) => (
                  <li
                    key={e.id}
                    className={`p-3 border rounded-lg text-sm transition-all duration-150 hover:shadow-md ${
                      e.type === "holiday"
                        ? "bg-linear-to-r from-red-50 to-red-100 border-red-200"
                        : "bg-linear-to-r from-blue-50 to-blue-100 border-blue-200"
                    }`}
                  >
                    <span className="font-semibold">{e.title}</span>{" "}
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${e.type === "holiday" ? "bg-red-200 text-red-800" : "bg-blue-200 text-blue-800"}`}
                    >
                      {e.type}
                    </span>
                    {e.description && (
                      <p className="text-xs mt-1 text-muted-foreground">
                        {e.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">My Leaves</h3>
            {selectedDayLeaves.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leaves</p>
            ) : (
              <ul className="space-y-2">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {selectedDayLeaves.map((l: any) => (
                  <li
                    key={l.token}
                    className={`p-3 border rounded-lg text-sm transition-all duration-150 hover:shadow-md ${
                      l.status === "Approved"
                        ? "bg-linear-to-r from-green-50 to-emerald-100 border-green-200"
                        : l.status === "Rejected"
                          ? "bg-linear-to-r from-red-50 to-red-100 border-red-200"
                          : "bg-linear-to-r from-yellow-50 to-amber-100 border-yellow-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{l.leaveType}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          l.status === "Approved"
                            ? "bg-green-200 text-green-800"
                            : l.status === "Rejected"
                              ? "bg-red-200 text-red-800"
                              : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {l.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {l.reason}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {(date?.getDay() === 0 || date?.getDay() === 6) && (
            <div className="mt-4 p-3 bg-linear-to-r from-amber-50 to-yellow-100 border border-amber-200 rounded-lg text-sm text-amber-800 font-medium flex items-center gap-2">
              <span className="text-lg">🎉</span>
              It&apos;s a Weekend! Enjoy your holiday.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
