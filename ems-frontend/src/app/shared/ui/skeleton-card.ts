import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div
      class="md3-card space-y-5"
    >
      <app-skeleton height="1.5rem" width="60%"></app-skeleton>
      <div class="space-y-3">
        <app-skeleton height="1rem" width="90%"></app-skeleton>
        <app-skeleton height="1rem" width="80%"></app-skeleton>
      </div>
      <div class="flex justify-between pt-4 border-t border-white/10">
        <app-skeleton height="1.2rem" width="30%"></app-skeleton>
        <app-skeleton height="1.2rem" width="20%"></app-skeleton>
      </div>
    </div>
  `,
  styles: [],
})
export class SkeletonCardComponent {}
