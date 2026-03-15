import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../../core/services/employee.service';
import { CreateEmployeeRequest } from '../../../../models/domain.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employeeForm: FormGroup;
  isEditMode = signal(false);
  loading = signal(false);
  error = signal('');
  showPassword = signal(false);

  private employeeId: string | null = null;

  constructor() {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['default123'],
      department: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]],
      phone: [''],
      address: [''],
      qualification: [''],
      dateOfBirth: [''],
      gender: [''],
    });
  }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.isEditMode.set(true);
      this.loadEmployee(this.employeeId);
      this.employeeForm.get('password')?.clearValidators();
      this.employeeForm.get('password')?.updateValueAndValidity();
    } else {
      this.employeeForm
        .get('password')
        ?.setValidators([Validators.required, Validators.minLength(6)]);
    }
  }

  loadEmployee(id: string): void {
    this.loading.set(true);
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          department: employee.department,
          phone: employee.phone,
          address: employee.address,
          qualification: employee.qualification,
          dateOfBirth: employee.dateOfBirth,
          gender: employee.gender,
          salary: employee.baseSalary || 0,
        });
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load access records for this profile');
        this.loading.set(false);
      },
    });
  }

  togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;

    this.loading.set(true);
    const request: CreateEmployeeRequest = this.employeeForm.value;

    if (this.isEditMode() && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, request).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => {
          this.error.set('Write permission denied: Could not update profile');
          this.loading.set(false);
        },
      });
    } else {
      this.employeeService.createEmployee(request).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => {
          this.error.set(err.error?.message || 'Transaction failed: Could not create member');
          this.loading.set(false);
        },
      });
    }
  }
}
