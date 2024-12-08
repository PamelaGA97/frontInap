import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Professor } from '../../models/professor.model';
import { firstValueFrom } from 'rxjs';
import { ProfessorService } from '../../services/professors.service';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { AlertType } from '../../../../../shared/services/alert.enum';

@Component({
  selector: 'app-professors-edit',
  standalone: true,
  imports: [ProfessorFormComponent],
  templateUrl: './professors-edit.component.html',
  styleUrl: './professors-edit.component.scss'
})
export class ProfessorsEditComponent {
  @ViewChild('professorForm') professorFormComponent!: ProfessorFormComponent;
  professorId!: string;
  professor!: Professor;

  constructor(
    private activatedRouter: ActivatedRoute,
    private professorService: ProfessorService,
    private location: Location,
    private toastService: ToastService
  ) {
    this.initialize();
  }

  async ngOnInit(): Promise<void> {
    await this.loadProfessor();
  }

  private initialize(): void {
    this.getProfessor();
  }
  
  private getProfessor(): void {
    this.professorId = this.activatedRouter.snapshot.paramMap.get('id') || '';
  }

  private async loadProfessor(): Promise<void> {
    await firstValueFrom(this.professorService.get(this.professorId))
      .then(
        (professor: Professor) => {
          this.professor = professor;
        }
      ).catch(
        (error: ErrorHandler) => {
          this.toastService.showHttpError(error);
        }
      );
  }

  backToProfessorList(): void {
    this.location.back();
  }

  editProfessor(): void {
    this.professorFormComponent.submit();
  }

  async saveProfessor(professor: Professor): Promise<void> {
    await firstValueFrom(this.professorService.patch(this.professorId, professor))
      .then(
        (response) => {
          this.toastService.showToast('Docente Actualizado', '', AlertType.SUCCESS);
        }
      ).catch(
        (error: ErrorHandler) => {
          this.toastService.showHttpError(error);
        }
      );
  }
}
