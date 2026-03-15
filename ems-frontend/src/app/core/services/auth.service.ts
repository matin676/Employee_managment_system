import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { AuthResponse, LoginRequest, User, ApiResponse } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private readonly USER_KEY = 'ems_user';

  // Signals for reactive state management
  private _user = signal<User | null>(this.loadUserFromStorage());
  private _loading = signal(false);

  // Computed signals
  readonly user = computed(() => this._user());
  readonly isAuthenticated = computed(() => !!this._user()); // Now derived from presence of user info
  readonly isAdmin = computed(() => this._user()?.role === 'ADMIN');
  readonly isEmployee = computed(() => this._user()?.role === 'EMPLOYEE');
  readonly loading = computed(() => this._loading());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // Sync user state change to session/localStorage for UI persistence
    effect(() => {
      const user = this._user();
      if (user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.USER_KEY);
      }
    });
  }

  private loadUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    this._loading.set(true);

    return this.http.post<ApiResponse<AuthResponse>>(`${this.API_URL}/login`, credentials, {
      withCredentials: true // Crucial for receiving cookies
    }).pipe(
      map(response => response.data),
      tap((authData) => {
        this._user.set(authData.user);
        this._loading.set(false);
      }),
      catchError((error) => {
        this._loading.set(false);
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    // Call backend logout to clear HttpOnly cookie
    this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this._user.set(null);
        this.router.navigate(['/login']);
      },
      error: () => {
        // Fallback: clear local state even if backend call fails
        this._user.set(null);
        this.router.navigate(['/login']);
      }
    });
  }

  checkAuth(): boolean {
    return this.isAuthenticated();
  }
}
