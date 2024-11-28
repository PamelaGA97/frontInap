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
    private secretaryService: SecretaryService,
    private toastService: ToastService
  ) {}

  backToSecretaryList(): void {
    this.location.back();
  }

  createSecretary(): void {
    this.secretaryFormComponent.submit();
  }

  saveSecretary(secretary: Secretary): void {
    this.secretaryService.create(secretary).subscribe(
      (response) => {
        this.toastService.showToast('El usuario secretaria fue creado', '', AlertType.SUCCESS);
        this.router.navigate([adminPath, 'secretaries'])
      }, (error: ErrorHandler) => {
        this.toastService.showToast(`${error.error} ${error.statusCode}`, `${error.message[0]}`, AlertType.ERROR);
     }
    );
  }
}
