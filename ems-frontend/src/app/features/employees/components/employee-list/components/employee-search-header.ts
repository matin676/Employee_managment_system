import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-search-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <header class="page-header">
      <div class="header-text-group">
        <h2 class="page-title">{{ title }}</h2>
        <p class="page-subtitle">{{ subtitle }}</p>
      </div>

      <div class="header-actions">
        <div class="search-box">
          <span class="material-symbols-outlined search-icon">search</span>
          <input
            type="text"
            [ngModel]="searchQuery"
            (ngModelChange)="onSearchChange($event)"
            [placeholder]="placeholder"
            class="search-input"
          />
        </div>

        <a routerLink="/employees/add" class="md3-btn primary-btn add-btn">
          <span class="material-symbols-outlined">add</span>
          <span>Add Member</span>
        </a>
      </div>
    </header>
  `,
  styles: [`
    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    @media (max-width: 767px) {
      .header-actions {
        flex-direction: column;
        align-items: stretch;
        width: 100%;
      }
    }
  `]
})
export class EmployeeSearchHeaderComponent {
  @Input() title = 'Workforce Directory';
  @Input() subtitle = 'Manage and view all organization members and their profiles';
  @Input() placeholder = 'Search employees...';
  @Input() searchQuery = '';
  
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(query: string): void {
    this.searchChange.emit(query);
  }
}
