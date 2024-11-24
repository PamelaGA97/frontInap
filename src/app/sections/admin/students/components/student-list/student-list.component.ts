import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { Student } from '../../models/student.model';
import { CommonModule } from '@angular/common';

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
    private router: Router
  ) {}

  addStudent(): void {
    this.router.navigate([this.path, 'create'])
  }

  openUserEdit(studentId: string): void {
    console.log('Accion de editar usuario')
  }

  deleteUser(studentId: string): void {
    console.log('Eliminar estudiante')
  }
}
