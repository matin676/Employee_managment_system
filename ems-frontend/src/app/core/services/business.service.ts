import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Leave,
  Page,
  Project,
  Attendance,
  Announcement,
  CreateAnnouncementRequest,
  CalendarEvent,
  ApiResponse,
} from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private apiUrl = 'http://localhost:8080/api/leaves';

  constructor(private http: HttpClient) {}

  applyForLeave(leave: Partial<Leave>): Observable<Leave> {
    return this.http.post<ApiResponse<Leave>>(this.apiUrl, leave).pipe(map(r => r.data));
  }

  getMyLeaves(page: number = 0, size: number = 10): Observable<Page<Leave>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Leave>>>(`${this.apiUrl}/my`, { params }).pipe(map(r => r.data));
  }

  getAllLeaves(page: number = 0, size: number = 10): Observable<Page<Leave>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Leave>>>(this.apiUrl, { params }).pipe(map(r => r.data));
  }

  updateStatus(id: string, status: string): Observable<Leave> {
    const params = new HttpParams().set('status', status);
    return this.http.put<ApiResponse<Leave>>(`${this.apiUrl}/${id}/status`, {}, { params }).pipe(map(r => r.data));
  }
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  createProject(project: Partial<Project>, assignedToId?: string): Observable<Project> {
    const payload = { ...project, assignedToId };
    return this.http.post<ApiResponse<Project>>(this.apiUrl, payload).pipe(map(r => r.data));
  }

  getAllProjects(page: number = 0, size: number = 10): Observable<Page<Project>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Project>>>(this.apiUrl, { params }).pipe(map(r => r.data));
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<ApiResponse<Project>>(`${this.apiUrl}/${id}`).pipe(map(r => r.data));
  }

  updateProject(id: string, project: Partial<Project>, assignedToId?: string): Observable<Project> {
    const payload = { ...project, assignedToId };
    return this.http.put<ApiResponse<Project>>(`${this.apiUrl}/${id}`, payload).pipe(map(r => r.data));
  }

  getMyProjects(page: number = 0, size: number = 10): Observable<Page<Project>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Project>>>(`${this.apiUrl}/my`, { params }).pipe(map(r => r.data));
  }

  updateStatus(id: string, status: string): Observable<Project> {
    const params = new HttpParams().set('status', status);
    return this.http.put<ApiResponse<Project>>(`${this.apiUrl}/${id}/status`, {}, { params }).pipe(map(r => r.data));
  }

  assignProject(id: string, employeeId: string): Observable<Project> {
    const params = new HttpParams().set('employeeId', employeeId);
    return this.http.put<ApiResponse<Project>>(`${this.apiUrl}/${id}/assign`, {}, { params }).pipe(map(r => r.data));
  }
}

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) {}

  clockIn(): Observable<Attendance> {
    return this.http.post<ApiResponse<Attendance>>(`${this.apiUrl}/clock-in`, {}).pipe(map(r => r.data));
  }

  clockOut(): Observable<Attendance> {
    return this.http.post<ApiResponse<Attendance>>(`${this.apiUrl}/checkout`, {}).pipe(map(r => r.data));
  }

  getMyAttendance(page: number = 0, size: number = 31): Observable<Page<Attendance>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Attendance>>>(`${this.apiUrl}/my`, { params }).pipe(map(r => r.data));
  }

  getAllAttendance(page: number = 0, size: number = 31): Observable<Page<Attendance>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Attendance>>>(this.apiUrl, { params }).pipe(map(r => r.data));
  }
}

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private apiUrl = 'http://localhost:8080/api/salaries';

  constructor(private http: HttpClient) {}

  issueSalary(
    request: import('../../models').CreateSalaryRequest,
  ): Observable<import('../../models').Salary> {
    return this.http.post<ApiResponse<import('../../models').Salary>>(this.apiUrl, request).pipe(map(r => r.data));
  }

  getMySalaries(
    page: number = 0,
    size: number = 10,
  ): Observable<Page<import('../../models').Salary>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<import('../../models').Salary>>>(`${this.apiUrl}/my`, { params }).pipe(map(r => r.data));
  }

  getAllSalaries(
    page: number = 0,
    size: number = 10,
  ): Observable<Page<import('../../models').Salary>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<import('../../models').Salary>>>(this.apiUrl, { params }).pipe(map(r => r.data));
  }
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getStats(): Observable<import('../../models').DashboardStats> {
    return this.http.get<ApiResponse<import('../../models').DashboardStats>>(`${this.apiUrl}/stats`).pipe(map(r => r.data));
  }
}

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private apiUrl = 'http://localhost:8080/api/performance';

  constructor(private http: HttpClient) {}

  createReview(
    request: import('../../models').CreatePerformanceReviewRequest,
  ): Observable<import('../../models').PerformanceReview> {
    return this.http.post<ApiResponse<import('../../models').PerformanceReview>>(this.apiUrl, request).pipe(map(r => r.data));
  }

  getMyReviews(
    page: number = 0,
    size: number = 10,
  ): Observable<import('../../models').Page<import('../../models').PerformanceReview>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<import('../../models').Page<import('../../models').PerformanceReview>>>(
      `${this.apiUrl}/my`,
      { params },
    ).pipe(map(r => r.data));
  }

  getEmployeeReviews(
    employeeId: string,
    page: number = 0,
    size: number = 10,
  ): Observable<import('../../models').Page<import('../../models').PerformanceReview>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<import('../../models').Page<import('../../models').PerformanceReview>>>(
      `${this.apiUrl}/employee/${employeeId}`,
      { params },
    ).pipe(map(r => r.data));
  }

  getAllReviews(
    page: number = 0,
    size: number = 10,
  ): Observable<import('../../models').Page<import('../../models').PerformanceReview>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<import('../../models').Page<import('../../models').PerformanceReview>>>(
      this.apiUrl,
      { params },
    ).pipe(map(r => r.data));
  }
}
@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/announcements';

  getActiveAnnouncements(): Observable<Announcement[]> {
    return this.http.get<ApiResponse<Announcement[]>>(this.apiUrl).pipe(map(r => r.data));
  }

  createAnnouncement(request: CreateAnnouncementRequest): Observable<Announcement> {
    return this.http.post<ApiResponse<Announcement>>(this.apiUrl, request).pipe(map(r => r.data));
  }

  deleteAnnouncement(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(map(r => r.data));
  }
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/calendar';

  getEvents(start: string, end: string): Observable<import('../../models').CalendarEvent[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<ApiResponse<import('../../models').CalendarEvent[]>>(`${this.apiUrl}/events`, {
      params,
    }).pipe(map(r => r.data));
  }
}
