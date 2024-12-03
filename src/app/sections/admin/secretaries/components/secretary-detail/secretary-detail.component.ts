import { Component } from '@angular/core';
import { SecretaryFormComponent } from '../../forms/secretary-form/secretary-form.component';
import { SecretaryService } from '../../services/secretary.service';
import { Secretary } from '../../models/secretary.model';
import { firstValueFrom } from 'rxjs';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../../shared/services/toast.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-secretary-detail',
  standalone: true,
  imports: [SecretaryFormComponent],
  templateUrl: './secretary-detail.component.html',
  styleUrl: './secretary-detail.component.scss'
})
export class SecretaryDetailComponent {
  resourseId!: string;
  secretary?: Secretary;
  preview: boolean = true;

  constructor (
    private secretaryService: SecretaryService,
    private location: Location,
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
}
