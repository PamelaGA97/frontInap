import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Secretary } from '../../models/secretary.model';
import { CommonModule } from '@angular/common';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { SecretaryService } from '../../services/secretary.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { ModalService } from '../../../../../core/services/modal/modal.service';
import { SecretaryFormComponent } from '../../forms/secretary-form/secretary-form.component';
import { SecretaryDetailComponent } from '../secretary-detail/secretary-detail.component';

@Component({
  selector: 'app-secretary-list',
  standalone: true,
  imports: [CommonModule, SecretaryDetailComponent],
  templateUrl: './secretary-list.component.html',
  styleUrl: './secretary-list.component.scss'
})
export class SecretaryListComponent {
  @ViewChild('secretaryDetail') secretaryDetailComponent!: SecretaryDetailComponent
  title: string ='Secretarias';
  path: string = '/admin/secretaries';
  preview = true
  secretaryDetail!: Secretary;

  secretaries: Secretary[] = [];

  constructor(
    private router: Router,
    private swalService: SwalService,
    private secretaryService: SecretaryService,
    private toastService: ToastService,
    private modalService: ModalService
  ) {
    this.initialize();
  }

  addSecretary(): void {
    this.router.navigate([this.path, 'create'])
  }

  openSecretaryEdit(secretaryId: string): void {
    const editpath = `${this.path}/edit`;
    this.router.navigate([editpath, secretaryId]);
  }

  async openModalDelete(secretary: Secretary): Promise<void> {
    const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar la secretaria ${secretary.user.firstName} ${secretary.user.secondName}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
      this.deleteSecretary(secretary.id);
		}
	}

  viewDetail(secretaryId: string): void {
    const detailPath = `${this.path}/show`;
    this.router.navigate([detailPath, secretaryId]);
    // this.modalService.open(this.secretaryDetailComponent);
    //this.secretaryDetail = secretary
  }

  private async initialize(): Promise<void> {
    await this.getAllSecretaries();
  }
  
  private async getAllSecretaries(): Promise<void> {
    this.secretaryService.getAll().subscribe(
      (response) => {
        this.secretaries = response;
      }, (error: ErrorHandler) => {
        this.toastService.showToast(`${error.error} ${error.statusCode}`,`${error.message[0]}`, AlertType.ERROR);
      }
    );
  }

  private deleteSecretary(secretaryId: string): void {
    this.secretaryService.delete(secretaryId).subscribe(
      (response) => {
        this.toastService.showToast(`Usuario Eliminado`, ``, AlertType.SUCCESS);
        this.getAllSecretaries();
      }, (error) => {
        this.toastService.showToast(`${error.error} ${error.statusCode}`,`${error.message[0]}`, AlertType.ERROR);
      });
  }
}
