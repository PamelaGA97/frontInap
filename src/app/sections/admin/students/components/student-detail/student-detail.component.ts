import { Component } from '@angular/core';
import { StudentFormComponent } from '../../forms/student-form/student-form.component';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ToastService } from '../../../../../shared/services/toast.service';
import { User } from '../../../users/model/user.model';
import { UserService } from '../../../../../shared/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-student-detail',
    standalone: true,
    imports: [StudentFormComponent],
    templateUrl: './student-detail.component.html',
    styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  studentId!: string;
  student?: User;
  preview: boolean = true;
  editMessageSuccess: string = 'Docente actualizado';
  pageView: string = 'students';
  path: string = '/admin/students'

  constructor(
    private location: Location,
    private aciveRoute: ActivatedRoute,
    private studenService: UserService<User>,
    private toastService: ToastService,
    private router: Router
  ) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.getStudentId();
    await this.loadStudent();
  }

  private getStudentId(): void {
    this.studentId = this.aciveRoute.snapshot.paramMap.get('id') || '';
  }

  private async loadStudent(): Promise<void> {
    firstValueFrom(this.studenService.getOne(this.studentId))
      .then((student: User) => {
        this.student = student;
      }).catch((error: Partial<HttpErrorResponse>) => {
        this.toastService.showHttpError(error.error);
      });
  }

  backToStudentList(): void {
    this.location.back();
  }

  editStudent(): void {
    const editpath = `${this.path}/edit`;
		this.router.navigate([editpath, this.student?.id]);
  }
}
