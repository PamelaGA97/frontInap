import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { StudentFormComponent } from "../../forms/student-form/student-form.component";
import { Student } from '../../models/student.model';
import { Route, Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';
import { StudentService } from '../../services/student.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ToastrModule } from 'ngx-toastr';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [StudentFormComponent],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss'
})
export class StudentCreateComponent {
	@ViewChild('studentForm') studenFormComponent!: StudentFormComponent;
  path: string = '/admin/students';

  constructor(
    private location: Location,
    private router: Router,
    private studentService: StudentService,
    private toastService: ToastService
  ) {}

  createStudent(): void {
    this.studenFormComponent.submit();
  }

  backToStudentList(): void {
    this.location.back()
  }

  saveStudent(student: Student): void {
    this.studentService.create(student).subscribe(
      (response) => {
        this.toastService.showToast('El Estudiante fue creado', '', AlertType.SUCCESS);
        this.router.navigate([this.path])
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      })
  }
}
