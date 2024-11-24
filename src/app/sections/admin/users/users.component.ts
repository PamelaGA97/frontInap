import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-users',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './users.component.html',
	styleUrl: './users.component.scss'
})
export class UsersComponent {
	/**
	 * Cargar todos los usuarios y pasarlos or variable a la otra vista
	 * Como las otras vistas son leazy loanding esta mantiene la carga actualizada
	 * Aplica el listar
	 * Aplica el crear
	 * Aplica el eliminar
	 * Aplica el editar
	 */
}
