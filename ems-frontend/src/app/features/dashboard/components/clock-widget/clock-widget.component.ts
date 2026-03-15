import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clock-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="md3-card clock-widget">
      <div class="glow-effect" [class.active]="isClockedIn"></div>

      <div class="clock-content relative-z">
        <div class="clock-header">
          <h4 class="clock-title">Time Ledger</h4>
          <div class="trend-badge" [class.success]="isClockedIn" [class.neutral]="!isClockedIn">
            {{ isClockedIn ? 'Active Trace' : 'Standby' }}
          </div>
        </div>

        <div class="clock-display">
          <div class="live-time">{{ liveClock }}</div>
          <p class="sync-status">System Synchronization Active</p>

          <button
            (click)="onToggle.emit()"
            [disabled]="loading"
            class="md3-btn fab-btn w-full clock-action-btn"
            [class.clocked-in]="isClockedIn"
            [class.clocked-out]="!isClockedIn"
          >
            @if (loading) {
              <span class="material-symbols-outlined spin-anim">sync</span>
            } @else {
              <span class="material-symbols-outlined">
                {{ isClockedIn ? 'timer_off' : 'timer' }}
              </span>
            }
            <span>{{ isClockedIn ? 'Terminate Shift' : 'Initiate Shift' }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .clock-widget {
      padding: 32px;
      position: relative;
      overflow: hidden;
      background-color: var(--md-sys-color-surface-container-high);
      border-radius: var(--md-sys-shape-corner-extra-large);
    }

    .glow-effect {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, var(--md-sys-color-primary-container) 0%, transparent 70%);
      opacity: 0.1;
      pointer-events: none;
      transition: all 0.5s ease;
      
      &.active {
        background: radial-gradient(circle, var(--md-sys-color-success-container) 0%, transparent 70%);
        opacity: 0.2;
      }
    }

    .relative-z { position: relative; z-index: 1; }

    .clock-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .clock-title {
      font: var(--md-sys-typescale-title-medium);
      color: var(--md-sys-color-on-surface);
      margin: 0;
    }

    .trend-badge {
      padding: 4px 12px;
      border-radius: 12px;
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

    .clock-display {
      text-align: center;
    }

    .live-time {
      font: var(--md-sys-typescale-display-medium);
      font-family: 'JetBrains Mono', monospace;
      color: var(--md-sys-color-primary);
      margin-bottom: 8px;
      letter-spacing: -1px;
    }

    .sync-status {
      font: var(--md-sys-typescale-label-small);
      color: var(--md-sys-color-on-surface-variant);
      margin-bottom: 32px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .clock-action-btn {
      height: 64px;
      border-radius: 20px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.clocked-out {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
      }
      
      &.clocked-in {
        background-color: var(--md-sys-color-error-container);
        color: var(--md-sys-color-on-error-container);
      }
    }

    .spin-anim {
      animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class ClockWidgetComponent {
  @Input() isClockedIn = false;
  @Input() liveClock = '';
  @Input() loading = false;
  @Output() onToggle = new EventEmitter<void>();
}
