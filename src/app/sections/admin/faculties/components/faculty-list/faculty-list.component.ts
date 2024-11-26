import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-list',
  standalone: true,
  imports: [],
  templateUrl: './faculty-list.component.html',
  styleUrl: './faculty-list.component.scss'
})
export class FacultyListComponent {
  title: string = 'Facultad';
  path: string =  '/admin/faculties';

  constructor(
    private router: Router
  ) {}

  addFaculty(): void {
    this.router.navigate([this.path, 'create'])
  }
}
