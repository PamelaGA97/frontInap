import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { StudentFacultyCount } from '../../home/model/student-faculty-count.model';
import { ApiQueryParams } from '../../../../shared/models/api-query-params';
@Injectable({
	providedIn: 'root'
})

export class StudentService {
	apiUrl = environment.apiUrl;
	resource: string = '/students';

	constructor(private http: HttpClient) {}

	create(data: Student): Observable<Student> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.post<Student>(path, data);
	}

	getAll(queryParams?: ApiQueryParams): Observable<Student[]> {
		const path = `${this.apiUrl}${this.resource}`;
		return this.http.get<Student[]>(path, {params: queryParams});
	}

	get(id: string): Observable<Student> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.get<Student>(path);
	}

	delete(id: string): Observable<Student> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.delete<Student>(path);
	}

	patch(id: string, data: Student): Observable<Student> {
		const path = `${this.apiUrl}${this.resource}/${id}`;
		return this.http.put<Student>(path, data);
	}

	studentForFaculty(): Observable<{data: StudentFacultyCount[]}> {
		const path = `${this.apiUrl}${this.resource}/student-for-faculty`;
		return this.http.get<{data: StudentFacultyCount[]}>(path);
	}
}