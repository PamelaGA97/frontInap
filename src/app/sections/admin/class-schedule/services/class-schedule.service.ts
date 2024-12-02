import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassSchedule } from '../models/class-schedule.model';
@Injectable({
  providedIn: 'root'
})

export class ClassScheduleService {
	apiUrl = environment.apiUrl;
	resource: string = '/class-schedules';

	constructor(private http: HttpClient) {}

	create(data: ClassSchedule): Observable<ClassSchedule> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<ClassSchedule>(path, data);
	}

	getAll(term?: string): Observable<ClassSchedule[]> {
		console.log(this.resource)
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<ClassSchedule[]>(path);
	}

	get(id: string): Observable<ClassSchedule> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.get<ClassSchedule>(path);
	}

	delete(id: string): Observable<ClassSchedule> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.delete<ClassSchedule>(path);
	}

	patch(id: string, data: ClassSchedule): Observable<ClassSchedule> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.put<ClassSchedule>(path, data);
	}
}