import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pulse-analytics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="md3-card pulse-widget">
      <div class="widget-header">
        <div class="widget-header-content">
          <div>
            <h3 class="widget-title">Nexus Pulse Analytics</h3>
            <p class="widget-subtitle">Real-time organizational health and activity metrics</p>
          </div>
          <div class="widget-actions">
            <button class="md3-btn text-btn">Daily</button>
            <button class="md3-btn tonal-btn active">Weekly</button>
          </div>
        </div>
      </div>
      <div class="widget-body chart-area">
        <div class="bar-chart-container">
          @for (val of [40, 70, 45, 90, 65, 85, 55]; track $index) {
            <div class="chart-bar-group">
              <div class="chart-bar" [style.height.%]="val"></div>
              <div class="chart-tooltip">{{ val }}%</div>
            </div>
          }
        </div>
        <div class="chart-labels">
          @for (day of ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; track day) {
            <span class="chart-label">{{ day }}</span>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pulse-widget {
      padding: 24px;
      margin-top: 32px;
      background-color: var(--md-sys-color-surface-container-low);
    }

    .widget-header {
      margin-bottom: 32px;
    }

    .widget-header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .widget-title {
      font: var(--md-sys-typescale-title-large);
      color: var(--md-sys-color-on-surface);
      margin: 0 0 4px 0;
    }

    .widget-subtitle {
      font: var(--md-sys-typescale-body-medium);
      color: var(--md-sys-color-on-surface-variant);
      margin: 0;
    }

    .widget-actions {
      display: flex;
      gap: 8px;
    }

    .bar-chart-container {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      height: 200px;
      padding: 0 20px;
      border-bottom: 1px solid var(--md-sys-color-outline-variant);
    }

    .chart-bar-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      max-width: 40px;
      
      &:hover {
        .chart-bar { background-color: var(--md-sys-color-primary); }
        .chart-tooltip { opacity: 1; visibility: visible; transform: translateY(-8px); }
      }
    }

    .chart-bar {
      width: 100%;
      background-color: var(--md-sys-color-primary-container);
      border-radius: 8px 8px 0 0;
      transition: all 0.3s var(--md-sys-motion-easing-standard);
    }

    .chart-tooltip {
      position: absolute;
      top: -32px;
      background-color: var(--md-sys-color-inverse-surface);
      color: var(--md-sys-color-inverse-on-surface);
      padding: 4px 8px;
      border-radius: 4px;
      font: var(--md-sys-typescale-label-small);
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .chart-labels {
      display: flex;
      justify-content: space-between;
      padding: 16px 20px 0;
    }

    .chart-label {
      flex: 1;
      text-align: center;
      font: var(--md-sys-typescale-label-medium);
      color: var(--md-sys-color-on-surface-variant);
      max-width: 40px;
    }

    .active {
      background-color: var(--md-sys-color-secondary-container) !important;
      color: var(--md-sys-color-on-secondary-container) !important;
    }
  `]
})
export class PulseAnalyticsComponent {}
