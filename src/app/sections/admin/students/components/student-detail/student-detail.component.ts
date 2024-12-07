import { Component } from '@angular/core';
import { StudentFormComponent } from '../../forms/student-form/student-form.component';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { firstValueFrom } from 'rxjs';
import { Student } from '../../models/student.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [StudentFormComponent],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  studentId!: string;
  student?: Student;
  preview: boolean = true;

  constructor(
    private location: Location,
    private aciveRoute: ActivatedRoute,
    private studenService: StudentService,
    private toastService: ToastService
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
    firstValueFrom(this.studenService.get(this.studentId))
      .then((student: Student) => {
        this.student = student;
      }).catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  backToStudentList(): void {
    this.location.back();
  }
}
