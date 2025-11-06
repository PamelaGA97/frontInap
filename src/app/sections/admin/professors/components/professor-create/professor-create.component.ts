import { Component, ViewChild } from '@angular/core';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../../../shared/services/user/user.service';
import { User } from '../../../users/model/user.model';

@Component({
    selector: 'app-professor-create',
    standalone: true,
    imports: [ProfessorFormComponent],
    templateUrl: './professor-create.component.html',
    styleUrl: './professor-create.component.scss'
})
export class ProfessorCreateComponent {
  @ViewChild('professorForm') professorFormComponent!: ProfessorFormComponent;
  path: string = '/admin/professors';

  constructor(
    private location: Location,
    private professorService: UserService<User>,
    private toastService: ToastService,
    private router: Router
  ) {}

  createProfessor(): void {
    this.professorFormComponent.submit();
  }

  backToProfessorList(): void {
    this.location.back();
  }

  async saveProfessor(professor: User): Promise<void> {
    await firstValueFrom(this.professorService.create(professor))
      .then(() => {
        this.toastService.showToast('Docente creado', '', AlertType.SUCCESS);
        this.router.navigate([this.path]);
      })
      .catch((error: Partial<HttpErrorResponse>) => {
        this.toastService.showHttpError(error.error);
      });
  }
}
