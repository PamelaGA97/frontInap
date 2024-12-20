import { Component, ViewChild } from '@angular/core';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { Professor } from '../../models/professor.model';
import { Location } from '@angular/common';
import { ProfessorService } from '../../services/professors.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { Router } from '@angular/router';

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
    private professorService: ProfessorService,
    private toastService: ToastService,
    private router: Router
  ) {}

  createProfessor(): void {
    this.professorFormComponent.submit();
  }

  backToProfessorList(): void {
    this.location.back();
  }

  saveProfessor(professor: Professor): void {
    this.professorService.create(professor).subscribe(
      (response) => {
        this.toastService.showToast(`Profesor creado.`, ``, AlertType.SUCCESS);
        this.router.navigate([this.path]);
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }
}
