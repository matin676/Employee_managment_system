import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PerformanceService } from '../../../../core/services/business.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Page } from '../../../../models/api-response.model';
import { PerformanceReview, Employee } from '../../../../models/domain.model';
import { BadgeComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-performance-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, BadgeComponent],
  templateUrl: './performance-list.html',
  styleUrl: './performance-list.scss',
})
export class PerformanceListComponent implements OnInit {
  private performanceService = inject(PerformanceService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  isAdmin = this.authService.isAdmin;

  reviews = signal<PerformanceReview[]>([]);
  employees = signal<Employee[]>([]);
  loading = signal(false);
  showModal = signal(false);
  submitting = signal(false);

  reviewForm = this.fb.group({
    employeeId: ['', Validators.required],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    feedback: ['', Validators.required],
  });

  ngOnInit() {
    this.loadReviews();
    if (this.isAdmin()) {
      this.loadEmployees();
    }
  }

  loadReviews() {
    this.loading.set(true);
    const fetch$ = this.isAdmin()
      ? this.performanceService.getAllReviews()
      : this.performanceService.getMyReviews();

    fetch$.subscribe({
      next: (res: Page<PerformanceReview>) => {
        this.reviews.set(res.content || []);
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Error loading reviews', err);
        this.loading.set(false);
      },
    });
  }

  loadEmployees() {
    this.employeeService.getAllEmployees(0, 100).subscribe((res) => {
      this.employees.set(res.content || []);
    });
  }

  openModal() {
    this.reviewForm.reset({ rating: 5 });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
    this.reviewForm.reset();
  }

  submitReview() {
    if (this.reviewForm.invalid) return;

    this.submitting.set(true);
    const val = this.reviewForm.getRawValue();

    const request = {
      employeeId: val.employeeId!,
      rating: Number(val.rating),
      feedback: val.feedback!,
    };

    this.performanceService.createReview(request).subscribe({
      next: () => {
        this.submitting.set(false);
        this.closeModal();
        this.loadReviews();
      },
      error: (err) => {
        console.error('Error creating review', err);
        this.submitting.set(false);
      },
    });
  }
}
