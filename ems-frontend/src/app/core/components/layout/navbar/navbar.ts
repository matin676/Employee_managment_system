import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../services/layout.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  layoutService = inject(LayoutService);
  authService = inject(AuthService);

  toggleSidebar() {
    this.layoutService.toggleSidebar();
  }

  logout() {
    this.authService.logout();
  }
}
