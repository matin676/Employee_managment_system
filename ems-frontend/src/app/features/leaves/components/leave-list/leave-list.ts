import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeaveService } from '../../../../core/services/business.service';
import { BadgeComponent, SkeletonTableComponent } from '../../../../shared/ui';
import { AuthService } from '../../../../core/services';
import { Leave } from '../../../../models/domain.model';

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [CommonModule, RouterModule, BadgeComponent, SkeletonTableComponent],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.scss',
})
export class LeaveListComponent implements OnInit {
  private leaveService = inject(LeaveService);
  public authService = inject(AuthService);

  leaves = signal<Leave[]>([]);
  loading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.loading.set(true);
    const fetch$ = this.authService.isAdmin()
      ? this.leaveService.getAllLeaves()
      : this.leaveService.getMyLeaves();

    fetch$.subscribe({
      next: (response) => {
        if (response && response.content) {
          this.leaves.set(response.content);
        } else {
          this.leaves.set([]);
        }
        this.loading.set(false);
      },
      error: (err: any) => {
        console.error('Error loading leaves', err);
        this.error.set('Failed to load leaves');
        this.loading.set(false);
      },
    });
  }

  approveLeave(leave: Leave): void {
    if (!confirm('Are you sure you want to approve this leave?')) return;
    this.updateStatus(leave.id, 'APPROVED');
  }

  rejectLeave(leave: Leave): void {
    if (!confirm('Are you sure you want to reject this leave?')) return;
    this.updateStatus(leave.id, 'REJECTED');
  }

  private updateStatus(id: string, status: string): void {
    this.loading.set(true);
    this.leaveService.updateStatus(id, status).subscribe({
      next: () => {
        this.loadLeaves();
      },
      error: (err: any) => {
        console.error('Error updating leave', err);
        this.error.set('Failed to update leave status');
        this.loading.set(false);
      },
    });
  }

  getBadgeType(status: string): any {
    switch (status) {
      case 'APPROVED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'REJECTED':
        return 'danger';
      case 'CANCELLED':
        return 'neutral';
      default:
        return 'neutral';
    }
  }
}
