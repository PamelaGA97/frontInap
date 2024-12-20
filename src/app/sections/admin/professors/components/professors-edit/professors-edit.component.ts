import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Professor } from '../../models/professor.model';
import { firstValueFrom } from 'rxjs';
import { ProfessorService } from '../../services/professors.service';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { adminPath } from '../../../../../core/admin-url-path';

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
  editMessageSuccess: string = 'Docente actualizado';
  pageView: string = 'professors';

  constructor(
    private activatedRouter: ActivatedRoute,
    private professorService: ProfessorService,
    private location: Location,
    private toastService: ToastService,
    private router: Router
  ) {
    console.log(1)
    this.initialize();
  }

  async ngOnInit(): Promise<void> {
    console.log(4)
    await this.loadProfessor();
  }

  private initialize(): void {
    console.log(2)
    this.getProfessor();
  }
  
  private getProfessor(): void {
    console.log(3)
    this.professorId = this.activatedRouter.snapshot.paramMap.get('id') || '';
  }

  private async loadProfessor(): Promise<void> {
    console.log(5)
    console.log(this.professorId)
    await firstValueFrom(this.professorService.get(this.professorId))
      .then(
        (professor: Professor) => {
          this.professor = professor;
          console.log(this.professor)
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
          this.toastService.showToast(this.editMessageSuccess, '', AlertType.SUCCESS);
          this.router.navigate([adminPath, this.pageView]);
        }
      ).catch(
        (error: ErrorHandler) => {
          this.toastService.showHttpError(error);
        }
      );
  }
}
