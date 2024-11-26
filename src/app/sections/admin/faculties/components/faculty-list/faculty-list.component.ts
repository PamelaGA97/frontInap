import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Faculty } from '../../models/faculty.model';

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
  faculties: Faculty[] = [
    {
      id: 'kjlasdjf;asldkfl',
      name: 'Tecnologia'
    },
    {
      id: 'kjlasdjf;asldkfl',
      name: 'Humanidades'
    },
    {
      id: 'kjlasdjf;asldkfl',
      name: 'Derecho'
    }
  ]

  constructor(
    private router: Router
  ) {}

  addFaculty(): void {
    this.router.navigate([this.path, 'create'])
  }

  openProfessorEdit(facultyId: string): void {

  }

  deleteProfessor(facultyId: string): void {

  }
}
