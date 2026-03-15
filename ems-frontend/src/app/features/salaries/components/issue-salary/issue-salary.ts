import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SalaryService } from '../../../../core/services/business.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Employee } from '../../../../models/domain.model';
import { BadgeComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-issue-salary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './issue-salary.html',
  styleUrl: './issue-salary.scss',
})
export class IssueSalaryComponent implements OnInit {
  private fb = inject(FormBuilder);
  private salaryService = inject(SalaryService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  employees = signal<Employee[]>([]);
  loading = signal(false);
  submitting = signal(false);
  error = signal('');

  form = this.fb.group({
    employeeId: ['', Validators.required],
    paymentDate: [new Date().toISOString().split('T')[0], Validators.required],
    baseSalary: [0, [Validators.required, Validators.min(0)]],
    bonuses: [0, [Validators.min(0)]],
    deductions: [0, [Validators.min(0)]],
  });

  ngOnInit(): void {
    this.loadEmployees();

    this.form.get('employeeId')?.valueChanges.subscribe((id) => {
      const emp = this.employees().find((e) => e.id === id);
      if (emp && emp.baseSalary) {
        this.form.patchValue({ baseSalary: emp.baseSalary });
      }
    });
  }

  calculateTotal(): number {
    const val = this.form.getRawValue();
    return Number(val.baseSalary || 0) + Number(val.bonuses || 0) - Number(val.deductions || 0);
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getAllEmployees(0, 1000).subscribe({
      next: (response) => {
        this.employees.set(response.content || []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load employees');
        this.loading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.submitting.set(true);
    this.error.set('');

    const formVal = this.form.getRawValue();

    const request = {
      employeeId: formVal.employeeId!,
      paymentDate: formVal.paymentDate!,
      baseSalary: Number(formVal.baseSalary),
      bonuses: Number(formVal.bonuses),
      deductions: Number(formVal.deductions),
    };

    this.salaryService.issueSalary(request).subscribe({
      next: () => {
        this.router.navigate(['/salaries']);
      },
      error: (err) => {
        console.error('Error issuing salary', err);
        if (err.status === 409) {
          this.error.set(err.error?.message || 'Salary already issued for this month.');
        } else {
          this.error.set('Failed to issue salary. Please try again.');
        }
        this.submitting.set(false);
      },
    });
  }
}
