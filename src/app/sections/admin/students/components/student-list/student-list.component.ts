import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { StudentService } from '../../services/student.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { YearPipe } from '../../../../../core/pipes/year.pipe';
import { AlertType } from '../../../../../shared/services/alert.enum';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, YearPipe],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})

export class StudentListComponent {
  title: string = 'Estudiantes';
  path: string = '/admin/students';
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private swalService: SwalService,
    private toastService: ToastService
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.studentService.getAll().subscribe(
      (response) => {
        this.students = response;
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      }
    );
  }

  addStudent(): void {
    this.router.navigate([this.path, 'create']);
  }

  openStudentEdit(studentId: string): void {
    console.log('Accion de editar usuario')
  }

  viewDetail(stidentId: string): void {
    
  }
  
  async openDeleteModal(student: Student): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el estdiante ${student.user.firstName} ${student.user.secondName}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
			console.log('Eliminar el usuario')
      this.deleteStudent(student.id);
		}
	}

  private deleteStudent(studentId: string): void {
    this.studentService.delete(studentId).subscribe(
      (response) => {
        this.toastService.showToast(`Estudiante eliminado`, ``, AlertType.SUCCESS);
        this.loadStudents();
      }, (error: ErrorHandler) => {
        this.toastService.showHttpError(error)
      }
    );
  }
}
