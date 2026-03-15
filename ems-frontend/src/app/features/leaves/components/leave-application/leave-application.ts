import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LeaveService } from '../../../../core/services/business.service';

@Component({
  selector: 'app-leave-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './leave-application.html',
  styleUrl: './leave-application.scss',
})
export class LeaveApplicationComponent {
  private fb = inject(FormBuilder);
  private leaveService = inject(LeaveService);
  private router = inject(Router);

  loading = signal(false);
  error = signal('');

  leaveTypes = [
    'SICK_LEAVE',
    'CASUAL_LEAVE',
    'VACATION',
    'MATERNITY_LEAVE',
    'PATERNITY_LEAVE',
    'OTHER',
  ];

  leaveForm = this.fb.group({
    leaveType: ['', Validators.required],
    startDate: [new Date().toISOString().split('T')[0], Validators.required],
    endDate: [new Date().toISOString().split('T')[0], Validators.required],
    reason: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.leaveForm.invalid) return;

    this.loading.set(true);
    this.error.set('');

    const formValue = this.leaveForm.getRawValue();
    const request = {
      leaveType: formValue.leaveType!,
      startDate: formValue.startDate!,
      endDate: formValue.endDate!,
      reason: formValue.reason!,
    };

    this.leaveService.applyForLeave(request).subscribe({
      next: () => {
        this.router.navigate(['/leaves']);
      },
      error: (err: any) => {
        console.error('Error applying for leave', err);
        this.error.set('Failed to submit leave request. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
