import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isSidebarOpen = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarOpen.update((val) => !val);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
