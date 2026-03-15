import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="dashboard-header">
      <div class="header-content">
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">System Live</span>
        </div>
        <h2 class="page-title">{{ title }}</h2>
        <p class="welcome-text">
          Welcome back, <span class="user-name">{{ userName }}</span>. {{ subtitle }}
        </p>
      </div>
      <div class="header-actions">
        <div class="session-info">
          <p class="session-label">Current Session</p>
          <p class="session-time">{{ currentTime }}</p>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 32px;
    }

    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background-color: var(--md-sys-color-success);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--md-sys-color-success);
    }

    .status-text {
      color: var(--md-sys-color-success);
      font: var(--md-sys-typescale-label-small);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .page-title {
      font: var(--md-sys-typescale-display-small);
      color: var(--md-sys-color-on-surface);
      margin: 0 0 8px 0;
    }

    .welcome-text {
      font: var(--md-sys-typescale-body-large);
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
    }

    .user-name {
      color: var(--md-sys-color-primary);
      font-weight: 600;
    }

    .session-info {
      text-align: right;
    }

    .session-label {
      font: var(--md-sys-typescale-label-medium);
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
    }

    .session-time {
      font: var(--md-sys-typescale-title-medium);
      color: var(--md-sys-color-on-surface);
      margin: 4px 0 0 0;
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 24px;
      }
      .session-info {
        text-align: left;
      }
    }
  `]
})
export class DashboardHeaderComponent {
  @Input() title = '';
  @Input() userName = '';
  @Input() subtitle = '';
  @Input() currentTime = '';
}
