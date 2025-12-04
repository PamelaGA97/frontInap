import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiQueryParams } from '../../../../shared/models/api-query-params';
import { PaginationResponse } from '../../../../shared/models/pagination-response.model';
import { Degree } from '../models/degree.model';
@Injectable({
  providedIn: 'root'
})

export class DegreeService {
	apiUrl = environment.apiUrl;
	resource: string = '/degrees';

	constructor(private http: HttpClient) {}

	create(data: Degree): Observable<Degree> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<Degree>(path, data);
	}

	getAll(queryParams: ApiQueryParams = {}): Observable<PaginationResponse<Degree>> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<PaginationResponse<Degree>>(path, {params: queryParams});
	}

	get(id: string): Observable<Degree> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.get<Degree>(path);
	}

	delete(id: string): Observable<Degree> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.delete<Degree>(path);
	}

	patch(id: string, data: Degree): Observable<Degree> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.put<Degree>(path, data);
	}
}