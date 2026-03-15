import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Globally enable withCredentials for cookie-based authentication
  req = req.clone({
    withCredentials: true,
  });

  // Manually attach XSRF token for cross-origin requests
  const xsrfToken = getCookie('XSRF-TOKEN');
  if (xsrfToken && (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
    req = req.clone({
      headers: req.headers.set('X-XSRF-TOKEN', xsrfToken)
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    }),
  );
};

function getCookie(name: string): string | null {
  const nameLenPlus = (name.length + 1);
  return document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(cookie => {
      return cookie.substring(0, nameLenPlus) === `${name}=`;
    })
    .map(cookie => {
      return decodeURIComponent(cookie.substring(nameLenPlus));
    })[0] || null;
}
