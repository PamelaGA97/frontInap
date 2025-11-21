import { Injectable } from '@angular/core';
import { Faculty } from '../models/faculty.model';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiQueryParams } from '../../../../shared/models/api-query-params';
import { PaginationResponse } from '../../../../shared/models/pagination-response.model';
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

	getAll(queryParams: ApiQueryParams = {}): Observable<PaginationResponse<Faculty>> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<PaginationResponse<Faculty>>(path, {params: queryParams});
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