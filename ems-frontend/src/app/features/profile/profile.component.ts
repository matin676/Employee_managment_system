import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services';
import { BadgeComponent } from '../../shared/ui';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  authService = inject(AuthService);

  currentPassword = '';
  newPassword = '';

  changePassword() {
    alert('Password change functionality coming soon!');
    this.currentPassword = '';
    this.newPassword = '';
  }
}
