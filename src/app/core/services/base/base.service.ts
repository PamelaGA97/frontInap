import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}
  /**
  // Método genérico para obtener todos los elementos de un recurso
  getAll<T>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${path}`).pipe(catchError(this.handleError));
  }

  // Método genérico para obtener un elemento específico por ID
  getById<T>(url: string, id: number): Observable<T> {
    return this.http.get<T>(`${url}/${id}`).pipe(catchError(this.handleError));
  }
 */
  // Método genérico para crear un nuevo elemento
  create<T>(data: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, data).pipe(catchError(this.handleError));
  }
/**
  // Método genérico para actualizar un elemento existente
  update<T>(url: string, id: number, data: T): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, data).pipe(catchError(this.handleError));
  }

  // Método genérico para eliminar un elemento por ID
  delete<T>(url: string, id: number): Observable<T> {
    return this.http.delete<T>(`${url}/${id}`).pipe(catchError(this.handleError));
  }
 */
  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error en el cliente o en la red
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Código de error: ${error.status}, ` + `Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
