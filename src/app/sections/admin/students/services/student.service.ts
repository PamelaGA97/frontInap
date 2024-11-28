import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Student } from '../models/student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  resource = '/students';
  apiUrl = environment.apiUrl;
    
  constructor( private http: HttpClient ) {}

  create(data: Student): Observable<Student> {
    const path = `${this.apiUrl}${this.resource}`;
    return this.http.post<Student>(path, data);
  }

  getAll(term?: string): Observable<Student[]> {
    const path = `${this.apiUrl}${this.resource}`;
    return this.http.get<Student[]>(path);
  }

  get(id: string): Observable<Student> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.get<Student>(path);
  }

  delete(id: string): Observable<Student> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.delete<Student>(path);
  }

  patch(id: string, data: Student): Observable<Student> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.put<Student>(path, data);
  }
}