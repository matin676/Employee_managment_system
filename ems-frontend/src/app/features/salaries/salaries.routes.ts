import { Routes } from '@angular/router';
import { SalaryListComponent } from './components/salary-list/salary-list';
import { IssueSalaryComponent } from './components/issue-salary/issue-salary';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

// Guard to check if user is admin
const adminGuard = () => {
  const auth = inject(AuthService);
  return auth.isAdmin();
};

export const SALARY_ROUTES: Routes = [
  {
    path: '',
    component: SalaryListComponent,
  },
  {
    path: 'my',
    component: SalaryListComponent,
  },
  {
    path: 'issue',
    component: IssueSalaryComponent,
    canActivate: [adminGuard],
  },
];
