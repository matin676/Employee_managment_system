import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-profile-card.html',
  styleUrl: './employee-profile-card.css',
})
export class EmployeeProfileCard {
  @Input() employee: any = {
    firstName: 'John',
    lastName: 'Doe',
    jobTitle: 'Software Engineer',
    email: 'john.doe@example.com',
    department: 'Engineering',
    status: 'Active',
  };

  getInitials(): string {
    if (!this.employee) return '?';
    return (
      `${this.employee.firstName?.charAt(0) || ''}${this.employee.lastName?.charAt(0) || ''}`.toUpperCase() ||
      '?'
    );
  }
}
