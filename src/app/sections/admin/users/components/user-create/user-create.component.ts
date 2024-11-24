import { Component, ViewChild } from '@angular/core';
//import { ModalViewComponent } from '../../../../../shared/components/modal/modal-view/modal-view.component';
import { UserFormComponent } from "../../forms/user-form/user-form.component";
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';

@Component({
	selector: 'app-user-create',
	standalone: true,
	imports: [UserFormComponent, CommonModule],
	templateUrl: './user-create.component.html',
	styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
	@ViewChild('userForm') userFormComponent!: UserFormComponent;

	constructor(
		private location: Location,
		private router: Router
	) {}

	createUser(): void {
		this.userFormComponent.submit();
		this.router.navigate([adminPath,'users']);
	}

	closeModal(): void {
		this.location.back();
	}
}
