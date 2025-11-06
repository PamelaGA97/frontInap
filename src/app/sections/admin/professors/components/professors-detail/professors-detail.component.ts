import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { ToastService } from '../../../../../shared/services/toast.service';
import { User } from '../../../users/model/user.model';
import { UserService } from '../../../../../shared/services/user/user.service';

@Component({
    selector: 'app-professors-detail',
    standalone: true,
    imports: [ProfessorFormComponent],
    templateUrl: './professors-detail.component.html',
    styleUrl: './professors-detail.component.scss'
})
export class ProfessorsDetailComponent {
  @ViewChild('professorForm') professorFormComponent!: ProfessorFormComponent;
  preview: boolean = true;
  professorId!: string;
  professor!: User;
  editMessageSuccess: string = 'Docente actualizado';
  pageView: string = 'professors';
  path: string = '/admin/professors'

  constructor(
    private userService: UserService<User>,
    private activatedRouter: ActivatedRoute,
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
    await firstValueFrom(this.userService.getOne(this.professorId))
      .then((professor: User) => {
          this.professor = professor;
      })
      .catch((error: Partial<HttpErrorResponse>) => {
          this.toastService.showHttpError(error.error);
        }
      );
  }

  backToProfessorList(): void {
    this.location.back();
  }

  editProfessor(): void {
		const editpath = `${this.path}/edit`;
		this.router.navigate([editpath, this.professor?.id]);
	}
}
