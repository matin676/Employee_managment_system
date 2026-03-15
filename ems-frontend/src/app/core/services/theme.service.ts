import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'ems_theme';
  darkMode = signal<boolean>(this.loadTheme());

  constructor() {
    effect(() => {
      const isDark = this.darkMode();
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(this.THEME_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(this.THEME_KEY, 'light');
      }
    });
  }

  toggleTheme() {
    this.darkMode.update((dark) => !dark);
  }

  private loadTheme(): boolean {
    // Force light mode
    return false;
  }
}
