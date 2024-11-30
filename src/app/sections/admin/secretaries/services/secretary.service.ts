import { Injectable } from '@angular/core';
import { Secretary } from '../models/secretary.model';
import { Api } from '../../../../core/services/base-crud/decorators/api.decorator';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Api('secretaries')
export class SecretaryService {
  apiUrl = environment.apiUrl;
	resource: string = '';

	constructor(private http: HttpClient) {}

	create(data: Secretary): Observable<Secretary> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<Secretary>(path, data);
	}

	getAll(term?: string): Observable<Secretary[]> {
		console.log(this.resource)
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