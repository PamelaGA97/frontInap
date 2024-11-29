import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseCrudService<T> {
	apiUrl = environment.apiUrl;
	resourceName: string = '';
	constructor(
		private http: HttpClient
	) {}

	create(data: T): Observable<T> {
		const path = `${this.apiUrl}${this.resourceName}`;
		return this.http.post<T>(path, data);
	}

	getAll(term?: string): Observable<T[]> {
		const path = `${this.apiUrl}${this.resourceName}`;
		return this.http.get<T[]>(path);
	}

	get(id: string): Observable<T> {
		const path = `${this.apiUrl}${this.resourceName}/${id}`;
		return this.http.get<T>(path);
	}

	delete(id: string): Observable<T> {
		const path = `${this.apiUrl}${this.resourceName}/${id}`;
		return this.http.delete<T>(path);
	}

	patch(id: string, data: T): Observable<T> {
		const path = `${this.apiUrl}${this.resourceName}/${id}`;
		return this.http.put<T>(path, data);
	}
}