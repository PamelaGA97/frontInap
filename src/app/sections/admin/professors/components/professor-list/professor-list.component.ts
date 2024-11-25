import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-list',
  standalone: true,
  imports: [],
  templateUrl: './professor-list.component.html',
  styleUrl: './professor-list.component.scss'
})
export class ProfessorListComponent {
  title: string = 'Docentes';
  path: string = '/admin/professors';

  constructor(
    private router: Router
  ) {}

  addProfessor(): void {
    this.router.navigate([this.path, 'create'])
  }
}
