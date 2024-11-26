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
  students: Student[] = [
    {
      id: 'caldsfjlasdfasldfl;',
      highschool: 'Postel',
      graduationYear: '2014',
      career: 'Electronica',
      user: {
        rol: UserRolEnum.STUDENT,
        firstName: 'Andrea',
        secondName: 'Lopez',
        ci: '98127391',
        cellphone: 77954876
      }
    },
    {
      id: 'ksajdfkajsdfkjl',
      highschool: 'Merinol',
      graduationYear: '2024',
      career: 'Econimia',
      user: {
        rol: UserRolEnum.STUDENT,
        firstName: 'Carlos',
        secondName: 'Martinez',
        ci: '983434391',
        cellphone: 77634876
      }
    }
  ];

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
