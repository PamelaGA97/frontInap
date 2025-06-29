import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { Professor } from '../../models/professor.model';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ProfessorService } from '../../services/professors.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { firstValueFrom } from 'rxjs';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';

@Component({
    selector: 'app-professor-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './professor-list.component.html',
    styleUrl: './professor-list.component.scss'
})
export class ProfessorListComponent {
  title: string = 'Docentes';
  path: string = '/admin/professors';

  professors: Professor[] = [];

  constructor(
    private router: Router,
    private swalService: SwalService,
    private toastService: ToastService,
    private professorService: ProfessorService
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.getAllProfessors();
  }

  private getAllProfessors(): void {
    firstValueFrom(this.professorService.getAll())
      .then((response: PaginationResponse<Professor>) => {
        this.professors = response.data;
        console.log(response)
      }).catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });


    // this.professorService.getAll().subscribe(
    //   (professors: Professor[]) => {
    //     this.professors = professors;
    //   }, (error: ErrorHandler) => {
    //     this.toastService.showHttpError(error);
    //   }
    // );
  }

  private deleteProfessor(professorId: string): void {
    this.professorService.delete(professorId).subscribe(
      (response) => {
        this.toastService.showToast(`Docente eliminado`, ``, AlertType.SUCCESS);
        this.getAllProfessors();
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      }
    );
  }

  addProfessor(): void {
    this.router.navigate([this.path, 'create'])
  }

  openProfessorEdit(professorId: string) {
    const editPath: string = `${this.path}/edit`;
    this.router.navigate([editPath, professorId]);
  }

  viewDetail(professorId: string): void {
    const editPath: string = `${this.path}/detail`;
    this.router.navigate([editPath, professorId]);
  }

  async openDeleteModal(professor: Professor): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el docente ${professor.user.firstName} ${professor.user.secondName}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
      this.deleteProfessor(professor.id);
		}
	}
}
