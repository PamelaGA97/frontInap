import { Component, ViewChild } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { Student } from '../../models/student.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { StudentFormComponent } from '../../forms/student-form/student-form.component';
import { adminPath } from '../../../../../core/admin-url-path';

@Component({
  selector: 'app-secretary-edit',
  standalone: true,
  imports: [StudentFormComponent],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.scss'
})
export class StudentEditComponent {
  @ViewChild('studentForm') studentFormComponent!: StudentFormComponent
  student!: Student;
  studentId!: string;
  successToastMessage: string = 'Estudiante Actualizado';
  pageView: string = 'students';

  constructor(
    private studentService: StudentService,
    private location: Location,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.getSecretaryId();
    await this.loadSecretary();
  }

  private getSecretaryId(): void {
    this.studentId = this.activateRouter.snapshot.paramMap.get('id') || '';
  }

  private async loadSecretary(): Promise<void> {
    await firstValueFrom(this.studentService.get(this.studentId))
      .then((student: Student) => {
        this.student = student;
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  backToStudentList(): void {
    this.location.back();
  }

  editStudent(): void {
    this.studentFormComponent.submit();
  }

  async saveStudent(student: Student): Promise<void> {
    firstValueFrom(this.studentService.patch(this.studentId, student))
      .then((student: Student) => {
        this.toastService.showToast()
        this.router.navigate([adminPath, this.pageView])
      })
      .catch((error)=> {
        this.toastService.showHttpError(error);
      });
  }
}
