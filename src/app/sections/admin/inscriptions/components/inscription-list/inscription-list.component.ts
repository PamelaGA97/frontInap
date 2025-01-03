import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FacultyCourseService } from '../../../faculty-courses/services/faculty-course.service';
import { FacultyCourse } from '../../../faculty-courses/models/faculty-course.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AddStudenToCourseFormComponent } from '../../forms/add-studen-to-course-form/add-studen-to-course-form.component';
import { ModalService } from '../../../../../core/services/modal/modal.service';

@Component({
  selector: 'app-inscription-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inscription-list.component.html',
  styleUrl: './inscription-list.component.scss'
})
export class InscriptionListComponent {
  title: string = 'Inscripciones';
  facultyCourses: FacultyCourse[] = [];

  constructor(
    private facultyCourseService: FacultyCourseService,
    private toastService: ToastService,
    private modalService: ModalService
  ) {
    this.initialize();
  }

  private initialize(): void {
      this.getFacultyCourse()
    }
  
    private getFacultyCourse(): void {
      // const storageDatas = this.facultyCoursesStorageService.getAll();
      // this.facultyCourses = storageDatas;
      // console.log(this.facultyCourses)
      firstValueFrom(this.facultyCourseService.getAll())
        .then((facultyCourses: FacultyCourse[]) => {
          this.facultyCourses = facultyCourses;
        })
        .catch((error: ErrorHandler) => {
          this.toastService.showHttpError(error)
        });
    }

    addStudent(): void {
      this.modalService.openLargeModal(AddStudenToCourseFormComponent)
        .then((data: any) => {
          console.log('cerre el modal')
          console.log(data)
        })
    }
}
