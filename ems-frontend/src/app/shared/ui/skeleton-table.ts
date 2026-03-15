import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from './skeleton';

@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div
      class="overflow-x-auto md3-card"
      style="padding: 0"
    >
      <table class="md3-table">
        <thead>
          <tr>
            @for (col of columns; track col) {
              <th class="px-6 py-4 text-left">
                <app-skeleton height="0.8rem" [width]="col"></app-skeleton>
              </th>
            }
          </tr>
        </thead>
        <tbody class="divide-y divide-white/10">
          @for (row of [1, 2, 3, 4, 5]; track row) {
            <tr class="hover:bg-white/30 transition-colors">
              @for (col of columns; track col) {
                <td class="px-6 py-5">
                  <app-skeleton height="0.8rem" width="70%"></app-skeleton>
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class SkeletonTableComponent {
  @Input() columns: string[] = ['40%', '30%', '20%', '10%'];
}
