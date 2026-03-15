import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-input.html',
  styleUrl: './ui-input.scss',
})
export class UiInput {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() control: FormControl = new FormControl(); // Default to avoid null checks
  @Input() icon = '';
  @Input() errorDetails = ''; // Optional custom error message
}
