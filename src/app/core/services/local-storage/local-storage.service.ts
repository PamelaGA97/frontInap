import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  /**
   * Guardar un elemento en el localStorage
   * @param key - La clave para identificar los datos
   * @param value - El valor que se quiere guardar
   */
  saveItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Obtener un elemento del localStorage
   * @param key - La clave del elemento a obtener
   * @returns El valor almacenado o null si no existe
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  /**
   * Actualizar un elemento en el localStorage
   * @param key - La clave del elemento a actualizar
   * @param newValue - El nuevo valor a almacenar
   */
  updateItem<T>(key: string, newValue: T): void {
    this.saveItem(key, newValue);
  }

  /**
   * Eliminar un elemento del localStorage
   * @param key - La clave del elemento a eliminar
   */
  deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Obtener todos los elementos almacenados en el localStorage
   * @returns Un objeto con todas las claves y valores almacenados
   */
  getAllItems(): Record<string, any> {
    const items: Record<string, any> = {};
    Object.keys(localStorage).forEach((key) => {
      items[key] = JSON.parse(localStorage.getItem(key)!);
    });
    return items;
  }

  /**
   * Limpiar todo el localStorage
   */
  clearAll(): void {
    localStorage.clear();
  }
}
