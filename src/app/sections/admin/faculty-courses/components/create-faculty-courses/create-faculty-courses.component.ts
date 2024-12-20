import { Component, ViewChild } from '@angular/core';
import { FacultyCourseFormComponent } from '../../forms/faculty-course-form/faculty-course-form.component';
import { FacultyCourseService } from '../../services/faculty-course.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FacultyCourse } from '../../models/faculty-course.model';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { FacultyCoursesStorageService } from '../../services/faculty-courses-storage.service';

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
  toastSuccessMessage: string = 'Curso creado';

  constructor(
    private location: Location,
    private facultyCourseService: FacultyCourseService,
    private toastService: ToastService,
    private router: Router,
    private facultyCoursesStorageService: FacultyCoursesStorageService
  ) {}

  createFacultyCourse(): void {
    this.facultyCourseFormComponent.submit();
  }

  backToFacultyCourseList(): void {
    this.location.back();
  }

  saveFacultyCourse(facultyCourses: FacultyCourse): void {
    // console.log(datas)
    // this.facultyCoursesStorageService.create(datas)
    // this.toastService.showToast(this.toastSuccessMessage, '', AlertType.SUCCESS);
    // this.router.navigate([this.path]);

    this.facultyCourseService.create(facultyCourses).subscribe(
      (response) => {
        this.toastService.showToast(`Curso creado.`, ``, AlertType.SUCCESS);
        this.router.navigate([this.path]);
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }
}
