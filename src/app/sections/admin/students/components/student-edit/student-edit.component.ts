import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../../../../shared/services/toast.service';
import { StudentFormComponent } from '../../forms/student-form/student-form.component';
import { adminPath } from '../../../../../core/admin-url-path';
import { UserService } from '../../../../../shared/services/user/user.service';
import { User } from '../../../users/model/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertType } from '../../../../../shared/services/alert.enum';

@Component({
    selector: 'app-secretary-edit',
    standalone: true,
    imports: [StudentFormComponent],
    templateUrl: './student-edit.component.html',
    styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent {
  @ViewChild('studentForm') studentFormComponent!: StudentFormComponent
  student?: User;
  studentId!: string;
  successToastMessage: string = 'Estudiante Actualizado';
  pageView: string = 'students';

  constructor(
    private studentService: UserService<User>,
    private location: Location,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private toastService: ToastService
  ) {}
  
  ngOnInit(): void {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.getSecretaryId();
    await this.loadStudent();
  }

  private getSecretaryId(): void {
    this.studentId = this.activateRouter.snapshot.paramMap.get('id') || '';
  }

  private async loadStudent(): Promise<void> {
    await firstValueFrom(this.studentService.getOne(this.studentId))
      .then((student: User) => {
        this.student = student;
      })
      .catch((error: Partial<HttpErrorResponse>) => {
        this.toastService.showHttpError(error.error);
      });
  }

  backToStudentList(): void {
    this.location.back();
  }

  editStudent(): void {
    this.studentFormComponent.submit();
  }

  async saveStudent(student: User): Promise<void> {
    await firstValueFrom(this.studentService.patch(this.studentId, student))
      .then(() => {
        this.toastService.showToast(this.successToastMessage, '', AlertType.SUCCESS);
        this.router.navigate([adminPath, this.pageView])
      })
      .catch((error)=> {
        this.toastService.showHttpError(error);
      });
  }
}
