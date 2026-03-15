import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ToastService } from '../../../../core/services/toast.service';
import { Employee } from '../../../../models/domain.model';
import { EmployeeProfileCard } from '../../../../shared/components/employee-profile-card/employee-profile-card';
import { EmployeeSearchHeaderComponent } from './components/employee-search-header';
import { EmployeeTableComponent } from './components/employee-table';
import { EmployeePaginationComponent } from './components/employee-pagination';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeProfileCard,
    EmployeeSearchHeaderComponent,
    EmployeeTableComponent,
    EmployeePaginationComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private toastService = inject(ToastService);

  private searchSubject = new Subject<string>();

  employees = signal<Employee[]>([]);
  loading = signal<boolean>(false);
  error = signal<string>('');
  searchQuery = '';

  page = signal<number>(0);
  size = 12; 
  totalElements = signal<number>(0);

  ngOnInit(): void {
    this.loadEmployees();
    
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery = query;
      this.page.set(0);
      this.loadEmployees();
    });
  }

  loadEmployees(): void {
    this.loading.set(true);
    this.error.set('');
    
    this.employeeService.getAllEmployees(this.page(), this.size, this.searchQuery).subscribe({
      next: (response) => {
        if (response && response.content) {
          this.employees.set(response.content);
          this.totalElements.set(response.totalElements);
        } else {
          this.employees.set([]);
          this.totalElements.set(0);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.error.set('Failed to load organizational data');
        this.toastService.error('Connection failure: Could not retrieve member list');
        this.loading.set(false);
      },
    });
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to remove this member?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.toastService.success('Member removed successfully');
          this.loadEmployees();
        },
        error: (err) => {
          this.toastService.error('Action failed: Insufficient permissions');
          this.error.set('Security restriction: Could not delete employee');
        },
      });
    }
  }

  onPageChange(newPage: number): void {
    this.page.set(newPage);
    this.loadEmployees();
  }
}
