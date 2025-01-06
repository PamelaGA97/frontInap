import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FacultyCourseService } from '../../../faculty-courses/services/faculty-course.service';
import { FacultyCourse } from '../../../faculty-courses/models/faculty-course.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AddStudenToCourseFormComponent } from '../../forms/add-studen-to-course-form/add-studen-to-course-form.component';
import { ModalService } from '../../../../../core/services/modal/modal.service';
import { Router } from '@angular/router';

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
  path: string = '/admin/inscriptions';


  constructor(
    private facultyCourseService: FacultyCourseService,
    private toastService: ToastService,
    private modalService: ModalService,
    private router: Router
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

    async addStudent(): Promise<void> {
      try {
        const modal = await this.modalService.open<any>(AddStudenToCourseFormComponent);
        console.log(modal);
        // agregar al estudiant
        // crear crud de estudiante storage
        // crear fake data base
      } catch (data) {
        console.log(data);
      }
    }

    viewDetail(facultyCourseId: string): void {
      const detailPath = `${this.path}/detail`;
      this.router.navigate([detailPath, facultyCourseId]);
    }
}




///// hacer el crear inscripcion con los pagos generados
///// en cada pago se puede seleccionar que si el pago es habilitado o ba gratis
///// identificar loe meces a pagar
///// PAGOS
///// en la vista pagos se puede seleccionar quien va a pagar
///// se puede seleccionar si el pago es gratis
/////  BAckend
/////  servicion de inscripciones
//// servicio de pagos 
