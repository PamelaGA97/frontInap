import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
	users = [
		{
			name: 'sergio',
			email: 'jeral.sergio@gmail.com',
			rol: 'MEDICO',
			id: 1
		},
		{
			name: 'liori Fernandez',
			email: 'lioriFernandez@gmail.com',
			rol: 'MEDICO',
			id: 2
		},
		{
			name: 'andrez',
			email: 'andrez_mamanni@gmail.com',
			rol: 'ESTUDIANTE',
			id: 3
		}
	]
	path: string = '/admin/users';

	constructor(
		private swalService: SwalService,
		private router: Router
	) {}

	async addUser(): Promise<void> {
		this.router.navigate([this.path,'create']);
	}

	async openUserDetail(userId: number): Promise<void> {
		console.log('mostrar detalle')
	}

	openUserEdit(userId: number): void {
		console.log('mostrar editar')
	}

	async deleteUser(userId: number): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el usuario ${userId}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
			console.log('Eliminar el usuario')
		}
	}
}
