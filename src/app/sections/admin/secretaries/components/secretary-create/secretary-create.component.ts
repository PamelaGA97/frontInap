import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { SecretaryFormComponent } from "../../forms/secretary-form/secretary-form.component";
import { Secretary } from '../../models/secretary.model';
import { Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';
import { SecretaryService } from '../../services/secretary.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { UserService } from '../../../../../shared/services/user/user.service';
import { firstValueFrom } from 'rxjs';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-secretary-create',
    standalone: true,
    imports: [SecretaryFormComponent],
    templateUrl: './secretary-create.component.html',
    styleUrl: './secretary-create.component.scss'
})
export class SecretaryCreateComponent {
  @ViewChild('secretaryForm') secretaryFormComponent!: SecretaryFormComponent

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService<Secretary>,
    private toastService: ToastService
  ) {}

  backToSecretaryList(): void {
    this.location.back();
  }

  createSecretary(): void {
    this.secretaryFormComponent.submit();
  }

  async saveSecretary(secretary: Secretary): Promise<void> {
    await firstValueFrom(this.userService.create(secretary))
    .then((response: any) => {
      this.toastService.showToast('Secretaria creada', '', AlertType.SUCCESS);
      this.router.navigate([adminPath, 'secretaries']);      
    }).catch((error: HttpErrorResponse) => {
      console.log(error)
      this.toastService.showHttpError(error.error);
    });
  }
}
