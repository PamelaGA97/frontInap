import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiQueryParams } from '../../../../shared/models/api-query-params';
import { PaginationResponse } from '../../../../shared/models/pagination-response.model';
import { User } from '../model/user.model';
@Injectable({
	providedIn: 'root'
})

export class UserService {
	apiUrl = environment.apiUrl;
	resource: string = '/users';
	defaultQueryParams = {};

	constructor(private http: HttpClient) {}

	create(data: User): Observable<User> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<User>(path, data);
	}

	getAll(queryParams: ApiQueryParams = {}): Observable<PaginationResponse<User>> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<PaginationResponse<User>>(path, {params: queryParams});
	}

	// get(id: string): Observable<Professor> {
	// 	const path = `${this.apiUrl}${this.resource}/${id}`;
	// 	return this.http.get<Professor>(path);
	// }

	// delete(id: string): Observable<Professor> {
	// 	const path = `${this.apiUrl}${this.resource}/${id}`;
	// 	return this.http.delete<Professor>(path);
	// }

	// patch(id: string, data: Professor): Observable<Professor> {
	// 	const path = `${this.apiUrl}${this.resource}/${id}`;
	// 	return this.http.put<Professor>(path, data);
	// }
}
