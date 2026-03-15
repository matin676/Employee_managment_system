import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../../../../../models/domain.model';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="md3-card table-container">
      <table class="md3-table">
        <thead>
          <tr>
            <th>Member</th>
            <th>Contact</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (employee of employees; track employee.id) {
            <tr class="table-row">
              <td>
                <div class="employee-cell">
                  <div class="avatar-sm">
                    {{ employee.firstName[0] }}{{ employee.lastName[0] }}
                  </div>
                  <div>
                    <div class="employee-name">{{ employee.fullName }}</div>
                    <div class="employee-role">{{ employee.qualification || 'Staff' }}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="contact-cell">
                  <span class="email">{{ employee.email }}</span>
                  <span class="phone">{{ employee.phone || 'No phone' }}</span>
                </div>
              </td>
              <td>{{ employee.department || 'General' }}</td>
              <td>
                <span class="md3-badge success">Active</span>
              </td>
              <td>
                <div class="action-cell">
                  <button class="md3-icon-btn" [routerLink]="['/employees/edit', employee.id]">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button class="md3-icon-btn error-text" (click)="delete.emit(employee.id)">
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      overflow-x: auto;
    }
    
    .employee-cell {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .avatar-sm {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      flex-shrink: 0;
    }

    .employee-name {
      font-weight: 600;
      color: var(--md-sys-color-on-surface);
    }

    .employee-role {
      font-size: 13px;
      color: var(--md-sys-color-on-surface-variant);
    }

    .contact-cell {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 13px;
    }

    .contact-cell .phone {
      color: var(--md-sys-color-on-surface-variant);
    }

    .action-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .md3-icon-btn {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--md-sys-color-on-surface-variant);
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: var(--md-sys-color-surface-container-high);
      }
      
      &.error-text {
        color: var(--md-sys-color-error);
      }
    }
  `]
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Output() delete = new EventEmitter<string>();
}
