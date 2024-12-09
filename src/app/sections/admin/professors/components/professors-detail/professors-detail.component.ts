import { Component, ViewChild } from '@angular/core';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { Professor } from '../../models/professor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from '../../services/professors.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';

@Component({
  selector: 'app-professors-detail',
  standalone: true,
  imports: [ProfessorFormComponent],
  templateUrl: './professors-detail.component.html',
  styleUrl: './professors-detail.component.scss'
})
export class ProfessorsDetailComponent {
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
    this.initialize();
  }

  async ngOnInit(): Promise<void> {
    await this.loadProfessor();
  }

  private initialize(): void {
    this.getProfessorId();
  }
  
  private getProfessorId(): void {
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
}
