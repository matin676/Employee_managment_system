import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="md3-card">
      <div *ngIf="title" class="mb-5 flex items-center justify-between">
        <h3 class="text-lg font-bold text-primary-900" style="margin: 0; font: var(--md-sys-typescale-title-large); color: var(--md-sys-color-on-surface);">
          {{ title }}
        </h3>
        <ng-content select="[card-action]"></ng-content>
      </div>
      <div class="relative z-10">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .md3-card {
      @apply transition-all duration-300;
      &:hover {
        transform: translateY(-2px);
      }
    }
  `],
})
export class CardComponent {
  @Input() title?: string;
}
