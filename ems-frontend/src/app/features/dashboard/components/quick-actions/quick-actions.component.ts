import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="quick-actions-section">
      <h3 class="section-title">Service Shortcuts</h3>
      <div class="quick-actions-grid">
        @for (action of actions; track action.label) {
          <a [routerLink]="action.link" class="md3-card action-card">
            <div class="action-icon-circle">
              <span class="material-symbols-outlined">{{ getMaterialIcon(action.label) }}</span>
            </div>
            <span class="action-label">{{ action.label }}</span>
          </a>
        }
      </div>
    </section>
  `,
  styles: [`
    .quick-actions-section {
      margin-top: 40px;
    }

    .section-title {
      font: var(--md-sys-typescale-title-medium);
      color: var(--md-sys-color-on-surface);
      margin-bottom: 16px;
    }

    .quick-actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 16px;
    }

    .action-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-decoration: none;
      background-color: var(--md-sys-color-surface-container-low);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover {
        background-color: var(--md-sys-color-secondary-container);
        transform: scale(1.02);
        .action-icon-circle { background-color: var(--md-sys-color-on-secondary-container); color: var(--md-sys-color-secondary-container); }
        .action-label { color: var(--md-sys-color-on-secondary-container); }
      }
    }

    .action-icon-circle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: var(--md-sys-color-surface-container-highest);
      color: var(--md-sys-color-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      
      .material-symbols-outlined { font-size: 28px; }
    }

    .action-label {
      font: var(--md-sys-typescale-label-large);
      color: var(--md-sys-color-on-surface);
      font-weight: 500;
      transition: all 0.2s ease;
    }
  `]
})
export class QuickActionsComponent {
  @Input() actions: any[] = [];

  getMaterialIcon(label: string): string {
    const icons: Record<string, string> = {
      'Workforce': 'badge',
      'Projects': 'account_tree',
      'Ledger': 'history_edu',
      'Payroll': 'payments',
      'My Off-time': 'event_busy',
      'My Assignments': 'task',
      'My Growth': 'trending_up',
      'Calendar': 'calendar_today'
    };
    return icons[label] || 'open_in_new';
  }
}
