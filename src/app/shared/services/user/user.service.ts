import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiQueryParams } from '../../models/api-query-params';
import { PaginationResponse } from '../../models/pagination-response.model';

@Injectable({
  providedIn: 'root'
})

export class UserService<T> {
 	apiUrl = environment.apiUrl;
	resource: string = '/users';
	defaultQueryParams = {};

	constructor(private http: HttpClient) {}

	create(data: T): Observable<T> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<T>(path, data);
	}

	getAll(queryParams: ApiQueryParams = {}): Observable<PaginationResponse<T>> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<PaginationResponse<T>>(path, {params: queryParams});
	}

	getOne(id: string): Observable<T> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.get<T>(path);
	}

	delete(id: string): Observable<T> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.delete<T>(path);
	}

	patch(id: string, data: T): Observable<T> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.patch<T>(path, data);
	}
}