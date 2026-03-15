import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../core/services/business.service';
import { CalendarEvent } from '../../models/domain.model';
import { SkeletonTableComponent } from '../../shared/ui';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { AuthService } from '../../core/services';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, SkeletonTableComponent],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class CalendarComponent implements OnInit {
  private calendarService = inject(CalendarService);

  currentMonth = signal(new Date());
  loading = signal(false);
  events = signal<CalendarEvent[]>([]);

  calendarDays = signal<any[]>([]);
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.loading.set(true);
    const start = startOfMonth(this.currentMonth());
    const end = endOfMonth(this.currentMonth());

    // Format dates as YYYY-MM-DD for backend
    const startStr = format(start, 'yyyy-MM-dd');
    const endStr = format(end, 'yyyy-MM-dd');

    this.calendarService.getEvents(startStr, endStr).subscribe({
      next: (data) => {
        this.events.set(data);
        this.generateCalendar();
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        // Handle error silently or show toast
      },
    });
  }

  generateCalendar() {
    const start = startOfWeek(startOfMonth(this.currentMonth()));
    const end = endOfWeek(endOfMonth(this.currentMonth()));

    const days = eachDayOfInterval({ start, end });

    const calendarData = days.map((date) => {
      const dayEvents = this.events().filter((event) => isSameDay(new Date(event.start), date)); // Simple filtering for start date match. For multi-day, need overlap logic.

      return {
        date,
        isCurrentMonth: isSameMonth(date, this.currentMonth()),
        events: dayEvents,
      };
    });

    this.calendarDays.set(calendarData);
  }

  prevMonth() {
    this.currentMonth.update((d) => subMonths(d, 1));
    this.loadEvents();
  }

  nextMonth() {
    this.currentMonth.update((d) => addMonths(d, 1));
    this.loadEvents();
  }

  isToday(date: Date): boolean {
    return isSameDay(date, new Date());
  }
}
