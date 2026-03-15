import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [class]="toast.type" (click)="toastService.remove(toast.id)">
          <span class="material-symbols-outlined icon">
            {{ getIcon(toast.type) }}
          </span>
          <span class="message">{{ toast.message }}</span>
          <button class="close-btn">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 9999;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 300px;
      max-width: 450px;
      padding: 12px 16px;
      border-radius: var(--md-sys-shape-corner-medium);
      background-color: var(--md-sys-color-surface-container-highest);
      color: var(--md-sys-color-on-surface);
      box-shadow: var(--md-sys-elevation-2);
      cursor: pointer;
      animation: slide-in 0.3s var(--md-sys-motion-easing-standard);
      
      &.success {
        background-color: var(--md-sys-color-success-container);
        color: var(--md-sys-color-on-success-container);
        .icon { color: var(--md-sys-color-success); }
      }
      
      &.error {
        background-color: var(--md-sys-color-error-container);
        color: var(--md-sys-color-on-error-container);
        .icon { color: var(--md-sys-color-error); }
      }
      
      &.warning {
        background-color: var(--md-sys-color-warning-container);
        color: var(--md-sys-color-on-warning-container);
      }
    }

    .icon { font-size: 20px; }
    .message { flex: 1; font: var(--md-sys-typescale-label-large); }
    .close-btn { 
      background: transparent; 
      border: none; 
      color: inherit; 
      padding: 4px;
      display: flex;
      opacity: 0.7;
      &:hover { opacity: 1; }
    }

    @keyframes slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}
