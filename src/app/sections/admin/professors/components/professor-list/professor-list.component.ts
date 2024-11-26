import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { Professor } from '../../models/professor.model';

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

  professors: Professor[] = [
    {
      id: 'caldsfjlasdfasldfl;',
      course: 'Matematicas',
      career: 'Electronica',
      user: {
        rol: UserRolEnum.TEACHER,
        firstName: 'Andrea',
        secondName: 'Lopez',
        ci: '98127391',
        cellphone: 77954876
      }
    },
    {
      id: 'ksajdfkajsdfkjl',
      course: 'Matematicas',
      career: 'Econimia',
      user: {
        rol: UserRolEnum.TEACHER,
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

  addProfessor(): void {
    this.router.navigate([this.path, 'create'])
  }

  openProfessorEdit(professorsId: string) {
    console.log(professorsId)
  }

  deleteProfessor(professorsId: string): void {
    console.log(professorsId)
  }
}
