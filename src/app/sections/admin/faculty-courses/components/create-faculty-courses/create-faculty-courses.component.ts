import { Component, ViewChild } from '@angular/core';
import { FacultyCourseFormComponent } from '../../forms/faculty-course-form/faculty-course-form.component';
import { FacultyCourseService } from '../../services/faculty-course.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacultyCourse } from '../../models/faculty-course.model';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AlertType } from '../../../../../shared/services/alert.enum';

@Component({
  selector: 'app-create-faculty-courses',
  standalone: true,
  imports: [FacultyCourseFormComponent],
  templateUrl: './create-faculty-courses.component.html',
  styleUrl: './create-faculty-courses.component.scss'
})
export class CreateFacultyCoursesComponent {
  @ViewChild('facultyCourseForm') facultyCourseFormComponent!: FacultyCourseFormComponent;
  path: string = '/admin/faculty-courses';

  constructor(
    private location: Location,
    private facultyCourseService: FacultyCourseService,
    private toastService: ToastService,
    private router: Router
  ) {}

  createFacultyCourse(): void {
    this.facultyCourseFormComponent.submit();
  }

  backToFacultyCourseList(): void {
    this.location.back();
  }

  saveFacultyCourse(professor: FacultyCourse): void {
    this.facultyCourseService.create(professor).subscribe(
      (response) => {
        this.toastService.showToast(`Curso creado.`, ``, AlertType.SUCCESS);
        this.router.navigate([this.path]);
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }
}
