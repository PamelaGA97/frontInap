import { Injectable } from '@angular/core';
import { Faculty } from '../models/faculty.model';
import { BaseCrudService } from '../../../../core/services/base-crud/base-crud.service';
import { Api } from '../../../../core/services/base-crud/decorators/api.decorator';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class FacultyService {
	apiUrl = environment.apiUrl;
	resource: string = '/faculties';

	constructor(private http: HttpClient) {}

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