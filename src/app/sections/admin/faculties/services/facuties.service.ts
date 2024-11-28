import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faculty } from '../models/faculty.model';
import { environment } from '../../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  resource = '/faculties';
  apiUrl = environment.apiUrl;
    
  constructor( private http: HttpClient ) {}

  create(data: Faculty): Observable<Faculty> {
    const path = `${this.apiUrl}${this.resource}`;
    return this.http.post<Faculty>(path, data);
  }

  getAll(term?: string): Observable<Faculty[]> {
    const path = `${this.apiUrl}${this.resource}`;
    return this.http.get<Faculty[]>(path);
  }

  get(id: string): Observable<Faculty> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.get<Faculty>(path);
  }

  delete(id: string): Observable<Faculty> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.delete<Faculty>(path);
  }

  patch(id: string, data: Faculty): Observable<Faculty> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.put<Faculty>(path, data);
  }
}