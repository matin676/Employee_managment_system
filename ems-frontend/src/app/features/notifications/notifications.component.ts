import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '../../core/services/business.service';
import { Announcement } from '../../models/domain.model';
import { BadgeComponent } from '../../shared/ui';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class NotificationsComponent implements OnInit {
  announcementService = inject(AnnouncementService);
  notifications = signal<Announcement[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.announcementService.getActiveAnnouncements().subscribe({
      next: (data) => {
        this.notifications.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  getBadgeType(priority: string): any {
    switch (priority) {
      case 'URGENT':
        return 'danger';
      case 'IMPORTANT':
        return 'warning';
      default:
        return 'accent';
    }
  }
}
