import { Routes } from '@angular/router';
import { authGuard, guestGuard, adminGuard } from './core/guards/auth.guard';
import { AppShell } from './core/components/layout/app-shell/app-shell';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./features/auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: AppShell,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./features/calendar/calendar.component').then((m) => m.CalendarComponent),
      },
      {
        path: 'employees',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('./features/employees/employees.routes').then((m) => m.EMPLOYEE_ROUTES),
      },
      {
        path: 'leaves',
        loadChildren: () => import('./features/leaves/leaves.routes').then((m) => m.LEAVE_ROUTES),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./features/projects/projects.routes').then((m) => m.PROJECT_ROUTES),
      },
      {
        path: 'salaries',
        loadChildren: () =>
          import('./features/salaries/salaries.routes').then((m) => m.SALARY_ROUTES),
      },
      {
        path: 'performance',
        loadChildren: () =>
          import('./features/performance/performance.routes').then((m) => m.PERFORMANCE_ROUTES),
      },
      {
        path: 'attendance',
        loadChildren: () =>
          import('./features/attendance/attendance.routes').then((m) => m.ATTENDANCE_ROUTES),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./features/notifications/notifications.component').then(
            (m) => m.NotificationsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
