import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService, AuthService } from '../../core/services';
import { Attendance } from '../../models/domain.model';
import { BadgeComponent, SkeletonTableComponent } from '../../shared/ui';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [CommonModule, BadgeComponent, SkeletonTableComponent],
  templateUrl: './attendance-history.component.html',
  styleUrl: './attendance-history.component.scss',
})
export class AttendanceHistoryComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private authService = inject(AuthService);

  isAdmin = this.authService.isAdmin;
  attendance = signal<Attendance[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.loading.set(true);
    const request$ = this.authService.isAdmin()
      ? this.attendanceService.getAllAttendance()
      : this.attendanceService.getMyAttendance();

    request$.subscribe({
      next: (res) => {
        this.attendance.set(res.content || []);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Error loading attendance:', err);
        this.error.set('Failed to load attendance records');
        this.loading.set(false);
      },
    });
  }

  getBadgeType(record: Attendance): any {
    if (!record.clockOut) return 'warning';
    return 'success';
  }

  getStatusLabel(record: Attendance): string {
    if (!record.clockOut) return 'ON-SHIFT';
    return 'COMPLETED';
  }
}
