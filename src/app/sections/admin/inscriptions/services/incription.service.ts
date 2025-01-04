import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class InscriptionService {
    apiUrl = environment.apiUrl;
    resource: string = '/faculty-course';

    constructor(private http: HttpClient) {}

    create(data: any): Observable<any> {
        const path = `${this.apiUrl}${this.resource}`;
        return this.http.post<any>(path, data);
    }

    getAll(term?: string): Observable<any[]> {
        const path = `${this.apiUrl}${this.resource}`;
        return this.http.get<any[]>(path);
    }

    get(id: string): Observable<any> {
        const path = `${this.apiUrl}${this.resource}/${id}`;
        return this.http.get<any>(path);
    }

    delete(id: string): Observable<any> {
        const path = `${this.apiUrl}${this.resource}/${id}`;
        return this.http.delete<any>(path);
    }

    patch(id: string, data: any): Observable<any> {
        const path = `${this.apiUrl}${this.resource}/${id}`;
        return this.http.put<any>(path, data);
    }
}