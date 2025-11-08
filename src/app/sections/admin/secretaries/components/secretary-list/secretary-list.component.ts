import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { firstValueFrom } from 'rxjs';
import { Secretary } from '../../models/secretary.model';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { UserService } from '../../../../../shared/services/user/user.service';
import { GenericStore } from '../../../../../shared/store/generic-crud.store';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';

@Component({
    selector: 'app-secretary-list',
    standalone: true,
    imports: [CommonModule, InfiniteScrollModule],
    templateUrl: './secretary-list.component.html',
    styleUrl: './secretary-list.component.scss'
})
export class SecretaryListComponent {
	title: string ='Secretarias';
	path: string = '/admin/secretaries';
	preview = true;
	secretaries: Secretary[] = [];
	isLoanding: boolean = false;

	constructor(
		private router: Router,
		private swalService: SwalService,
		private userService: UserService<Secretary>,
		private toastService: ToastService,
		public store: GenericStore<Secretary>
	) {}

	ngOnInit(): void {
		this.store.clear()
		this.initialize()
	}

	private initialize(): void {
		this.loadNextPage();
	}

	loadNextPage(): void {
		if (this.isLoanding) return;
		const paginationMeta = this.store.pagination();
		if (!paginationMeta.hasMore) return;

		firstValueFrom(this.userService.getAll(
			{
				rol: UserRolEnum.SECRETARY,
				page: paginationMeta.currentPage,
				limit: paginationMeta.itemsForPage
			}
		)).then((response: PaginationResponse<Secretary>) => {
			response.meta.currentPage = response.meta.currentPage + 1;
			this.store.addEntities(response.data, response.meta);
			this.store.addPaginationDetail(response.meta);
			this.isLoanding = false;
		})
		.catch((error: Partial<HttpErrorResponse>) => {
			this.toastService.showHttpError(error.error);
			this.isLoanding = false;
		});
	}
  
	addSecretary(): void {
		this.router.navigate([this.path, 'create'])
	}

	openSecretaryEdit(secretaryId: string): void {
		const editpath = `${this.path}/edit`;
		this.router.navigate([editpath, secretaryId]);
	}

	async openModalDelete(secretary: Secretary): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar la secretaria ${secretary.firstName} ${secretary.secondName}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
			this.deleteSecretary(secretary.id);
		}
	}

	viewDetail(secretaryId: string): void {
		const detailPath = `${this.path}/show`;
		this.router.navigate([detailPath, secretaryId]);
	}

	private async deleteSecretary(secretaryId: string): Promise<void> {
		await firstValueFrom(this.userService.delete(secretaryId))
		.then(() => {
			this.toastService.showToast(`Usuario Eliminado`, ``, AlertType.SUCCESS);
			this.ngOnInit();
		}).catch((error: Partial<HttpErrorResponse>) => {
			this.toastService.showHttpError(error.error);
		});
	}
}
