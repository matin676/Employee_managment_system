import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../../core/services/business.service';
import { AuthService } from '../../../../core/services';
import { Project } from '../../../../models/domain.model';

import { BadgeComponent, SkeletonCardComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, BadgeComponent, SkeletonCardComponent],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
})
export class ProjectListComponent implements OnInit {
  private projectService = inject(ProjectService);
  public authService = inject(AuthService);

  projects = signal<Project[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading.set(true);
    const fetch$ = this.authService.isAdmin()
      ? this.projectService.getAllProjects()
      : this.projectService.getMyProjects();

    fetch$.subscribe({
      next: (response) => {
        if (response && response.content) {
          this.projects.set(response.content);
        } else {
          this.projects.set([]);
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Error loading projects', err);
        this.error.set('Failed to load projects');
        this.loading.set(false);
      },
    });
  }

  getBadgeType(status: string): any {
    switch (status) {
      case 'COMPLETED':
      case 'GRADED':
        return 'success';
      case 'IN_PROGRESS':
        return 'accent';
      case 'PENDING':
      case 'ASSIGNED':
        return 'warning';
      case 'SUBMITTED':
        return 'danger';
      default:
        return 'neutral';
    }
  }
}
