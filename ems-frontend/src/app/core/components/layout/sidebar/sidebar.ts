import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  layoutService = inject(LayoutService);
  authService = inject(AuthService);

  private allMenuItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Employees', icon: 'group', route: '/employees', adminOnly: true },
    { label: 'Leaves', icon: 'event_note', route: '/leaves' },
    { label: 'Attendance', icon: 'schedule', route: '/attendance' },
    { label: 'Projects', icon: 'work', route: '/projects' },
  ];

  get menuItems() {
    return this.allMenuItems.filter(item => !item.adminOnly || this.authService.isAdmin());
  }

  closeSidebar() {
    this.layoutService.closeSidebar();
  }
}
