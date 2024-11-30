import { Component } from '@angular/core';
import { FacultyCourse } from '../../models/faculty-course.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../shared/services/toast.service';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { FacultyCourseService } from '../../services/faculty-course.service';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';

@Component({
  selector: 'app-faculty-courses-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-courses-list.component.html',
  styleUrl: './faculty-courses-list.component.scss'
})
export class FacultyCoursesListComponent {
  title: string = 'Cursos';
  facultyCourses: FacultyCourse[] = [];
  path: string =  '/admin/faculty-courses';

  constructor(
    private router: Router,
    private toastService: ToastService,
    private swalService: SwalService,
    private facultyCourseService: FacultyCourseService
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.getFacultyCourse()
  }

  private getFacultyCourse(): void {
    console.log('traer desde backend')
  }

  private deleteFacultyCourse(facultyCourseId: string): void {
    this.facultyCourseService.delete(facultyCourseId).subscribe(
      (response) => {
        this.toastService.showToast(`La facultad fue eliminada.`, '', AlertType.SUCCESS);
        this.getFacultyCourse();
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      }
    );
  }

  addFacultyCourse(): void {
    this.router.navigate([this.path, 'create'])
  }

  openfacultyCourseEdit(facultyCourseId: string): void {
    console.log('para editar')
  }

  async openDeleteFacultyCourse(facultyCourse: FacultyCourse): Promise<void> {
    const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el curso?.`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
      this.deleteFacultyCourse(facultyCourse.id);
		}
  }
}
