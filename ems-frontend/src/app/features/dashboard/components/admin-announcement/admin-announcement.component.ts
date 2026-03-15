import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnnouncementService } from '../../../../core/services/business.service';
import { CreateAnnouncementRequest, AnnouncementPriority } from '../../../../models/domain.model';
import { CardComponent } from '../../../../shared/ui';

@Component({
  selector: 'app-admin-announcement',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './admin-announcement.html',
  styleUrl: './admin-announcement.scss',
})
export class AdminAnnouncementComponent {
  private announcementService = inject(AnnouncementService);

  loading = signal(false);
  request = signal<CreateAnnouncementRequest>({
    title: '',
    content: '',
    priority: 'NORMAL',
  });

  submit() {
    this.loading.set(true);
    this.announcementService.createAnnouncement(this.request()).subscribe({
      next: () => {
        this.loading.set(false);
        this.request.set({ title: '', content: '', priority: 'NORMAL' });
        // Refresh feed (can be done with an event/subject in service if needed)
        window.location.reload(); // Simple refresh for now
      },
      error: () => this.loading.set(false),
    });
  }
}
