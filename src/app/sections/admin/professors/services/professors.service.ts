import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';
@Injectable({
	providedIn: 'root'
})

export class ProfessorService {
	apiUrl = environment.apiUrl;
	resource: string = '/professors';

	constructor(private http: HttpClient) {}

	create(data: Professor): Observable<Professor> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<Professor>(path, data);
	}

	getAll(term?: string): Observable<Professor[]> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<Professor[]>(path);
	}

	get(id: string): Observable<Professor> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.get<Professor>(path);
	}

	delete(id: string): Observable<Professor> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.delete<Professor>(path);
	}

	patch(id: string, data: Professor): Observable<Professor> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.put<Professor>(path, data);
	}
}