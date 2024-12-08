import { Component } from '@angular/core';

@Component({
  selector: 'app-professors-detail',
  standalone: true,
  imports: [],
  templateUrl: './professors-detail.component.html',
  styleUrl: './professors-detail.component.scss'
})
export class ProfessorsDetailComponent {
  constructor() {}

  editProfessor(): void {}

  backToProfessorList(): void {}
}
