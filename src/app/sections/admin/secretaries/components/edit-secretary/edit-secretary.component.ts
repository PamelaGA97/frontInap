import { Component, ViewChild } from '@angular/core';
import { SecretaryFormComponent } from '../../forms/secretary-form/secretary-form.component';
import { SecretaryService } from '../../services/secretary.service';
import { CommonModule, Location } from '@angular/common';
import { Secretary } from '../../models/secretary.model';
import { ActivatedRoute, Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';

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
    private secretaryService: SecretaryService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
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
    await firstValueFrom(this.secretaryService.get(this.resourseId))
      .then((response: Secretary) => {this.secretary = response;})
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  backToSecretaryList(): void {
    this.location.back();
  }

  editarSecretary(): void {
    this.secretaryFormComponent.submit();
  }

  async saveSecretary(secretary: Secretary): Promise<void> {
    await firstValueFrom(this.secretaryService.patch(secretary.id, secretary))
      .then((response) => {
        this.toastService.showToast(this.toastSuccessMessage, '', AlertType.SUCCESS);
        this.router.navigate([adminPath, this.pageName]);
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }
}
