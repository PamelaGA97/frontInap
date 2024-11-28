import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})

export class StudentListComponent {
  title: string = 'Estudiantes';
  path: string = '/admin/students';
  students: Student[] = [];

  constructor(
    private router: Router,
    private swalService: SwalService,
  ) {}

  addStudent(): void {
    this.router.navigate([this.path, 'create'])
  }

  openStudentEdit(studentId: string): void {
    console.log('Accion de editar usuario')
  }
  
  async deleteStudent(student: Student): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el estdiante ${student.user.firstName} ${student.user.secondName}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
			console.log('Eliminar el usuario')
		}
	}
}
