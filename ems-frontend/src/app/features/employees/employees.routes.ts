import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/employee-list/employee-list').then((m) => m.EmployeeListComponent),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/employee-form/employee-form').then((m) => m.EmployeeFormComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/employee-form/employee-form').then((m) => m.EmployeeFormComponent),
  },
];
