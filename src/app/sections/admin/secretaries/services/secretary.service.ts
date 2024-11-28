import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Secretary } from '../models/secretary.model';

@Injectable({
  providedIn: 'root'
})
export class SecretaryService {
  resource = '/secretaries';
  apiUrl = environment.apiUrl;
    
  constructor( private http: HttpClient ) {}

  create(data: Secretary): Observable<Secretary> {
    const path = `${this.apiUrl}${this.resource}`;
    return this.http.post<Secretary>(path, data);
  }

  getAll(term?: string): Observable<Secretary[]> {
    const path = `${this.apiUrl}${this.resource}`;
    return this.http.get<Secretary[]>(path);
  }

  get(id: string): Observable<Secretary> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.get<Secretary>(path);
  }

  delete(id: string): Observable<Secretary> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.delete<Secretary>(path);
  }

  patch(id: string, data: Secretary): Observable<Secretary> {
    const path = `${this.apiUrl}${this.resource}/${id}`;
    return this.http.put<Secretary>(path, data);
  }
}