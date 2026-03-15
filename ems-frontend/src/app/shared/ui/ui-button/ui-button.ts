import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
})
export class UiButton {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading = false;
  @Input() disabled = false;

  get classes(): string {
    const base = 'md3-btn';
    const variants = {
      primary: 'primary-btn',
      secondary: 'tonal-btn',
      danger: 'danger-btn',
      ghost: 'text-btn',
    };
    return `${base} ${variants[this.variant]}`;
  }
}
