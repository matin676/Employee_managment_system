import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementService } from '../../../../core/services/business.service';
import { Announcement } from '../../../../models/domain.model';
import { CardComponent, BadgeComponent, SkeletonComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-announcement-feed',
  standalone: true,
  imports: [CommonModule, CardComponent, BadgeComponent, SkeletonComponent],
  templateUrl: './announcement-feed.html',
  styleUrl: './announcement-feed.scss',
})
export class AnnouncementFeedComponent implements OnInit {
  private announcementService = inject(AnnouncementService);
  announcements = signal<Announcement[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loadAnnouncements();
  }

  loadAnnouncements() {
    this.loading.set(true);
    this.announcementService.getActiveAnnouncements().subscribe({
      next: (data) => {
        this.announcements.set(data || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  getPriorityClasses(priority: string): string {
    switch (priority) {
      case 'URGENT':
        return 'urgent';
      case 'IMPORTANT':
        return 'important';
      default:
        return 'normal';
    }
  }

  getPriorityBadgeType(priority: string): any {
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
