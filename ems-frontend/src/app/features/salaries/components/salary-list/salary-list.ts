import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SalaryService } from '../../../../core/services/business.service';
import { AuthService } from '../../../../core/services';
import { Salary } from '../../../../models/domain.model';
import { BadgeComponent, SkeletonTableComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-salary-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CurrencyPipe,
    DatePipe,
    BadgeComponent,
    SkeletonTableComponent,
  ],
  templateUrl: './salary-list.html',
  styleUrl: './salary-list.scss',
})
export class SalaryListComponent implements OnInit {
  private salaryService = inject(SalaryService);
  private authService = inject(AuthService);

  isAdmin = this.authService.isAdmin;
  salaries = signal<Salary[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loadSalaries();
  }

  loadSalaries(): void {
    this.loading.set(true);
    const fetch$ = this.authService.isAdmin()
      ? this.salaryService.getAllSalaries()
      : this.salaryService.getMySalaries();

    fetch$.subscribe({
      next: (response) => {
        if (response && response.content) {
          this.salaries.set(response.content);
        } else {
          this.salaries.set([]);
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Error loading salaries', err);
        this.error.set('Failed to load salary history');
        this.loading.set(false);
      },
    });
  }

  getBadgeType(status: string): any {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'neutral';
    }
  }
}
