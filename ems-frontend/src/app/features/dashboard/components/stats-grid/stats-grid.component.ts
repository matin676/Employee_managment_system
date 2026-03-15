import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stats-grid">
      @for (stat of stats; track stat.title) {
        <div class="md3-card stat-card">
          <div class="stat-card-header">
            <div
              class="stat-icon-container"
              [style.background-color]="stat.color + '1A'"
              [style.color]="stat.color"
            >
              <span class="material-symbols-outlined">{{ getMaterialIcon(stat.title) }}</span>
            </div>
            <div
              class="trend-badge"
              [class.success]="stat.trend === 'up'"
              [class.neutral]="stat.trend !== 'up'"
            >
              {{ stat.trend === 'up' ? '+12%' : 'Stable' }}
            </div>
          </div>
          <div class="stat-card-content">
            <div class="stat-info">
              <p class="stat-title">{{ stat.title }}</p>
              <h4 class="stat-value">{{ stat.value }}</h4>
            </div>
            <div class="stat-chart">
              <svg viewBox="0 0 100 40" class="sparkline">
                <path
                  [attr.d]="stat.sparkline"
                  fill="none"
                  [attr.stroke]="stat.color"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 24px;
    }

    .stat-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      background-color: var(--md-sys-color-surface-container-low);
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--md-sys-elevation-3);
        background-color: var(--md-sys-color-surface-container);
      }
    }

    .stat-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-icon-container {
      width: 48px;
      height: 48px;
      border-radius: var(--md-sys-shape-corner-medium);
      display: flex;
      align-items: center;
      justify-content: center;
      
      .material-symbols-outlined { font-size: 24px; }
    }

    .trend-badge {
      padding: 4px 12px;
      border-radius: var(--md-sys-shape-corner-full);
      font: var(--md-sys-typescale-label-small);
      font-weight: 600;
      
      &.success {
        background-color: var(--md-sys-color-success-container);
        color: var(--md-sys-color-on-success-container);
      }
      
      &.neutral {
        background-color: var(--md-sys-color-surface-container-highest);
        color: var(--md-sys-color-on-surface-variant);
      }
    }

    .stat-card-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .stat-title {
      font: var(--md-sys-typescale-label-large);
      color: var(--md-sys-color-on-surface-variant);
      margin: 0 0 4px 0;
    }

    .stat-value {
      font: var(--md-sys-typescale-headline-medium);
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }

    .stat-chart {
      width: 80px;
      height: 32px;
    }

    .sparkline {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
  `]
})
export class StatsGridComponent {
  @Input() stats: any[] = [];

  getMaterialIcon(title: string): string {
    const icons: Record<string, string> = {
      'Workforce Strength': 'group',
      'Active Sectors': 'domain',
      'Pending Clearances': 'pending_actions',
      'In-Flight Projects': 'rocket_launch',
      'Pending Leaves': 'event_busy',
      'Active Assignments': 'assignment',
      'Shift Precision': 'timer'
    };
    return icons[title] || 'leaderboard';
  }
}
