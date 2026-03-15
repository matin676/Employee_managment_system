import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AttendanceService, DashboardService } from '../../core/services/business.service';
import { DashboardStats } from '../../models/domain.model';
import { SkeletonCardComponent } from '../../shared/ui';
import { AnnouncementFeedComponent } from './components/announcement-feed/announcement-feed.component';
import { AdminAnnouncementComponent } from './components/admin-announcement/admin-announcement.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { StatsGridComponent } from './components/stats-grid/stats-grid.component';
import { PulseAnalyticsComponent } from './components/pulse-analytics/pulse-analytics.component';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { ClockWidgetComponent } from './components/clock-widget/clock-widget.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonCardComponent,
    AnnouncementFeedComponent,
    AdminAnnouncementComponent,
    DashboardHeaderComponent,
    StatsGridComponent,
    PulseAnalyticsComponent,
    QuickActionsComponent,
    ClockWidgetComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  attendanceService = inject(AttendanceService);
  dashboardService = inject(DashboardService);

  isClockedIn = signal(false);
  loading = signal(false);
  loadingStats = signal(true);
  currentTime = signal('');
  liveClock = signal('');

  stats = signal<any[]>([]);

  dashboardTitle = computed(() => 
    this.authService.isAdmin() ? 'Command Center' : 'Nexus Dashboard'
  );

  dashboardSubtitle = computed(() => 
    this.authService.isAdmin() ? "Operational overview and workforce metrics." : "Your organizational pulse and task ledger."
  );

  quickActions = computed(() => {
    if (this.authService.isAdmin()) {
      return [
        { label: 'Workforce', link: '/employees' },
        { label: 'Projects', link: '/projects' },
        { label: 'Ledger', link: '/attendance' },
        { label: 'Payroll', link: '/salaries' },
      ];
    } else {
      return [
        { label: 'My Off-time', link: '/leaves' },
        { label: 'My Assignments', link: '/projects' },
        { label: 'My Growth', link: '/performance' },
        { label: 'Calendar', link: '/calendar' },
      ];
    }
  });

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.loadStats();
    if (!this.authService.isAdmin()) {
      this.checkAttendanceStatus();
    }
  }

  updateTime() {
    const now = new Date();
    this.currentTime.set(
      now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    );
    this.liveClock.set(
      now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    );
  }

  loadStats() {
    this.loadingStats.set(true);
    this.dashboardService.getStats().subscribe({
      next: (data: DashboardStats) => {
        if (this.authService.isAdmin()) {
          this.stats.set([
            {
              title: 'Workforce Strength',
              value: data.totalEmployees || 0,
              color: '#6366f1',
              trend: 'up',
              sparkline: 'M0,35 Q25,5 50,30 T100,10',
            },
            {
              title: 'Active Sectors',
              value: data.activeDepartments || 0,
              color: '#10b981',
              trend: 'stable',
              sparkline: 'M0,20 L20,20 L40,15 L60,25 L80,20 L100,20',
            },
            {
              title: 'Pending Clearances',
              value: data.pendingLeaves || 0,
              color: '#f59e0b',
              trend: 'up',
              sparkline: 'M0,30 L20,35 L40,10 L60,20 L80,5 L100,15',
            },
            {
              title: 'In-Flight Projects',
              value: data.activeProjects || 0,
              color: '#3b82f6',
              trend: 'up',
              sparkline: 'M0,40 L10,30 L30,35 L50,10 L70,25 L90,5 L100,10',
            },
          ]);
        } else {
          this.stats.set([
            {
              title: 'Pending Leaves',
              value: data.myPendingLeaves || 0,
              color: '#f59e0b',
              trend: 'stable',
              sparkline: 'M0,20 L100,20',
            },
            {
              title: 'Active Assignments',
              value: data.myActiveProjects || 0,
              color: '#3b82f6',
              trend: 'up',
              sparkline: 'M0,30 L50,10 L100,20',
            },
            {
              title: 'Shift Precision',
              value: this.isClockedIn() ? 'Synced' : 'Standby',
              color: this.isClockedIn() ? '#10b981' : '#ef4444',
              trend: this.isClockedIn() ? 'up' : 'down',
              sparkline: this.isClockedIn() ? 'M0,20 Q50,0 100,20' : 'M0,20 Q50,40 100,20',
            },
          ]);
        }
        this.loadingStats.set(false);
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
        this.loadingStats.set(false);
      },
    });
  }

  checkAttendanceStatus() {
    this.attendanceService.getMyAttendance(0, 1).subscribe({
      next: (page) => {
        if (page.content.length > 0) {
          const latest = page.content[0];
          const today = new Date().toISOString().split('T')[0];
          if (latest.date.toString() === today && !latest.clockOut) {
            this.isClockedIn.set(true);
            this.updateEmployeeStatsWithAttendance(true);
          }
        }
      },
      error: (err: any) => console.error('Error checking attendance', err),
    });
  }

  updateEmployeeStatsWithAttendance(clockedIn: boolean) {
    const currentStats = this.stats();
    if (currentStats.length >= 3 && currentStats[2].title === 'Shift Precision') {
      const newStats = [...currentStats];
      newStats[2] = {
        ...newStats[2],
        value: clockedIn ? 'Synced' : 'Standby',
        color: clockedIn ? '#10b981' : '#ef4444',
        trend: clockedIn ? 'up' : 'down',
        sparkline: clockedIn ? 'M0,20 Q50,0 100,20' : 'M0,20 Q50,40 100,20',
      };
      this.stats.set(newStats);
    }
  }

  toggleClock() {
    this.loading.set(true);
    if (this.isClockedIn()) {
      this.attendanceService.clockOut().subscribe({
        next: () => {
          this.isClockedIn.set(false);
          this.loading.set(false);
          this.updateEmployeeStatsWithAttendance(false);
        },
        error: (err: any) => {
          console.error('Error clocking out', err);
          this.loading.set(false);
        },
      });
    } else {
      this.attendanceService.clockIn().subscribe({
        next: () => {
          this.isClockedIn.set(true);
          this.loading.set(false);
          this.updateEmployeeStatsWithAttendance(true);
        },
        error: (err: any) => {
          console.error('Error clocking in', err);
          if (err.status === 409) {
            this.isClockedIn.set(true);
            this.updateEmployeeStatsWithAttendance(true);
          }
          this.loading.set(false);
        },
      });
    }
  }
}
