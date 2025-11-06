import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { adminPath } from '../../../../../core/admin-url-path';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../users/model/user.model';
import { UserService } from '../../../../../shared/services/user/user.service';

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
  professor!: User;
  editMessageSuccess: string = 'Docente actualizado';
  pageName: string = 'professors';

  constructor(
    private activatedRouter: ActivatedRoute,
    private userService: UserService<User>,
    private location: Location,
    private toastService: ToastService,
    private router: Router
  ) {
  }
  
  ngOnInit(): void {
    this.initialize();
  }
  
  private async initialize(): Promise<void> {
    this.getProfessor();
    await this.loadProfessor();
  }
  
  private getProfessor(): void {
    this.professorId = this.activatedRouter.snapshot.paramMap.get('id') || '';
  }

  private async loadProfessor(): Promise<void> {
    await firstValueFrom(this.userService.getOne(this.professorId))
      .then((professor: User) => {
          this.professor = professor;
      })
      .catch(
        (error: Partial<HttpErrorResponse>) => {
          this.toastService.showHttpError(error.error);
        }
      );
  }

  backToProfessorList(): void {
    this.location.back();
  }

  editProfessor(): void {
    this.professorFormComponent.submit();
  }

  async saveProfessor(professor: User): Promise<void> {
    await firstValueFrom(this.userService.patch(this.professorId, professor))
      .then(() => {
          this.toastService.showToast(this.editMessageSuccess, '', AlertType.SUCCESS);
          this.router.navigate([adminPath, this.pageName]);
      }).catch((error: Partial<HttpErrorResponse>) => {
          this.toastService.showHttpError(error.error);
      });
  }
}
