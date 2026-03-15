import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, CreateEmployeeRequest, Page, ApiResponse } from '../../models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees(
    page: number = 0,
    size: number = 10,
    search: string = '',
  ): Observable<Page<Employee>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ApiResponse<Page<Employee>>>(this.apiUrl, { params }).pipe(
      map(response => response.data)
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createEmployee(request: CreateEmployeeRequest): Observable<Employee> {
    return this.http.post<ApiResponse<Employee>>(this.apiUrl, request).pipe(
      map(response => response.data)
    );
  }

  updateEmployee(id: string, request: CreateEmployeeRequest): Observable<Employee> {
    return this.http.put<ApiResponse<Employee>>(`${this.apiUrl}/${id}`, request).pipe(
      map(response => response.data)
    );
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
