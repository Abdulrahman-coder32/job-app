import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';  // تغيير إلى '/api' لاستخدام الـ proxy

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('ApiService: Token from localStorage:', token ? 'موجود' : 'مش موجود');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  // Auth
  signup(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // Jobs
  getJobs(filters: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs`, { params: filters, headers: this.getHeaders() });
  }

  getJob(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/${id}`);
  }

  createJob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, data, { headers: this.getHeaders() });
  }

  getMyJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/my`, { headers: this.getHeaders() });
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${id}`, { headers: this.getHeaders() });
  }

  // Applications
  applyToJob(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/applications`, data, { headers: this.getHeaders() });
  }

  getApplicationsForJob(jobId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/applications/job/${jobId}`, { headers: this.getHeaders() });
  }

  getMyApplications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/applications/my`, { headers: this.getHeaders() });
  }

  updateApplicationStatus(id: string, status: 'accepted' | 'rejected'): Observable<any> {
    return this.http.patch(`${this.apiUrl}/applications/${id}`, { status }, { headers: this.getHeaders() });
  }

  // Users
  updateProfile(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/users/${id}`, data, { headers: this.getHeaders() });
  }

  // Messages
  getMessages(appId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/messages/${appId}`, { headers: this.getHeaders() });
  }
}
