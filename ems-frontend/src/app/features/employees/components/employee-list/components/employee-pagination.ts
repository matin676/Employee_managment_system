import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pagination-controls">
      <button
        (click)="onPageChange(page - 1)"
        [disabled]="page === 0"
        class="md3-icon-btn"
      >
        <span class="material-symbols-outlined">chevron_left</span>
      </button>

      <div class="page-info">
        Page {{ page + 1 }} of {{ totalPages }}
      </div>

      <button
        (click)="onPageChange(page + 1)"
        [disabled]="page + 1 >= totalPages"
        class="md3-icon-btn"
      >
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  `,
  styles: [`
    .pagination-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      margin-top: 40px;
      padding-bottom: 24px;
    }

    .page-info {
      font: var(--md-sys-typescale-label-large);
      color: var(--md-sys-color-on-surface);
    }
    
    .md3-icon-btn {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--md-sys-color-on-surface-variant);
      transition: all 0.2s ease;
      
      &:hover:not(:disabled) {
        background-color: var(--md-sys-color-surface-container-high);
      }
      
      &:disabled {
        opacity: 0.38;
        cursor: not-allowed;
      }
    }
  `]
})
export class EmployeePaginationComponent {
  @Input() page = 0;
  @Input() totalElements = 0;
  @Input() size = 10;
  
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalElements / this.size) || 1;
  }

  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.pageChange.emit(newPage);
    }
  }
}
