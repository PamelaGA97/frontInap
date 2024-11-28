import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Faculty } from '../../models/faculty.model';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { FacultyService } from '../../services/facuties.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';

@Component({
  selector: 'app-faculty-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-list.component.html',
  styleUrl: './faculty-list.component.scss'
})
export class FacultyListComponent {
  title: string = 'Facultad';
  path: string =  '/admin/faculties';
  faculties: Faculty[] = [];

  constructor(
    private router: Router,
    private swalService: SwalService,
    private facultyService: FacultyService,
    private toastService: ToastService
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.getAllFaculties();
  }

  private getAllFaculties(): void {
    this.facultyService.getAll().subscribe(
      (resposne) => {
        console.log(resposne)
        this.faculties = resposne;
      });
  }

  addFaculty(): void {
    this.router.navigate([this.path, 'create'])
  }

  openFacultyEdit(facultyId: string): void {
    this.facultyService.get(facultyId).subscribe(
      (response) => {
        console.log(`Este es el detalle de: ${facultyId}`,response);
      });
  }

  async deleteFaculty(faculty: Faculty): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar la facultad de ${faculty.name}.`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {

      this.facultyService.delete(faculty.id).subscribe(
        (response) => {
          console.log(response)
          this.toastService.showToast(`La facultad ${faculty.name} fue eliminada.`, '', AlertType.SUCCESS);
          this.getAllFaculties();
        }
      );
		}
	}
}
