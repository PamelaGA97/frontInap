import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacultyCourse } from '../models/faculty-course.model';
@Injectable({
  providedIn: 'root'
})

export class FacultyCourseService {
	apiUrl = environment.apiUrl;
	resource: string = '/faculty-course';

	constructor(private http: HttpClient) {}

	create(data: FacultyCourse): Observable<FacultyCourse> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<FacultyCourse>(path, data);
	}

	getAll(term?: string): Observable<FacultyCourse[]> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<FacultyCourse[]>(path);
	}

	get(id: string): Observable<FacultyCourse> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.get<FacultyCourse>(path);
	}

	delete(id: string): Observable<FacultyCourse> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.delete<FacultyCourse>(path);
	}

	patch(id: string, data: FacultyCourse): Observable<FacultyCourse> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.put<FacultyCourse>(path, data);
	}
}