import { Component, ViewChild } from '@angular/core';
import { SecretaryFormComponent } from '../../forms/secretary-form/secretary-form.component';
import { CommonModule, Location } from '@angular/common';
import { Secretary } from '../../models/secretary.model';
import { ActivatedRoute, Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { UserService } from '../../../../../shared/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-edit-secretary',
    standalone: true,
    imports: [SecretaryFormComponent, CommonModule],
    templateUrl: './edit-secretary.component.html',
    styleUrl: './edit-secretary.component.scss'
})
export class EditSecretaryComponent {
	@ViewChild('secretaryForm') secretaryFormComponent!: SecretaryFormComponent
	resourseId!: string;
	secretary?: Secretary;
	pageName: string = 'secretaries';
	toastSuccessMessage: string = 'Secretaria Actualizada';

	constructor (
		private userService: UserService<Secretary>,
		private location: Location,
		private router: Router,
		private route: ActivatedRoute,
		private toastService: ToastService
	) {}
  
	ngOnInit(): void {
		this.initialize();
	}

	private async initialize(): Promise<void> {
		this.getSecretaryId();
		await this.getSecretaryData();
	}

	private getSecretaryId(): void {
		this.resourseId = this.route.snapshot.paramMap.get('id') || '';
	}

	private async getSecretaryData(): Promise<void> {
		await firstValueFrom(this.userService.getOne(this.resourseId))
		.then((response: Secretary) => {
			this.secretary = response;
		}).catch((error: Partial<HttpErrorResponse>) => {
			this.toastService.showHttpError(error.error);
		});
	}

	backToSecretaryList(): void {
		this.location.back();
	}

	editarSecretary(): void {
		this.secretaryFormComponent.submit();
	}

	async saveSecretary(secretary: Secretary): Promise<void> {
		await firstValueFrom(this.userService.patch(this.resourseId, secretary))
		.then(() => {
			this.toastService.showToast(this.toastSuccessMessage, '', AlertType.SUCCESS);
			this.router.navigate([adminPath, this.pageName]);
		})
		.catch((error: Partial<HttpErrorResponse>) => {
			this.toastService.showHttpError(error.error);
		});
	}
}
