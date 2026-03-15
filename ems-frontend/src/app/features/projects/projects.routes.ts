import { Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list';
import { ProjectFormComponent } from './components/project-form/project-form';

export const PROJECT_ROUTES: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'new',
    component: ProjectFormComponent,
  },
  {
    path: ':id',
    component: ProjectFormComponent,
  },
];
