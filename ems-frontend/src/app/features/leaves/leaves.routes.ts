import { Routes } from '@angular/router';
import { LeaveListComponent } from './components/leave-list/leave-list';
import { LeaveApplicationComponent } from './components/leave-application/leave-application';

export const LEAVE_ROUTES: Routes = [
  {
    path: '',
    component: LeaveListComponent,
  },
  {
    path: 'apply',
    component: LeaveApplicationComponent,
  },
];
