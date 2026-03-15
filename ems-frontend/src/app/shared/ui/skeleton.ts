import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [class]="
        'premium-skeleton rounded-lg animate-pulse ' + className
      "
      [style.width]="width"
      [style.height]="height"
    ></div>
  `,
  styles: [
    `
      .premium-skeleton {
        background: linear-gradient(
          90deg,
          var(--md-sys-color-surface-container-high) 25%,
          var(--md-sys-color-surface-container-highest) 50%,
          var(--md-sys-color-surface-container-high) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 2s infinite linear;
      }
      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `,
  ],
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '1rem';
  @Input() className = '';
}
