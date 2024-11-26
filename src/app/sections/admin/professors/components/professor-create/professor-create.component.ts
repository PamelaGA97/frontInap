import { Component, ViewChild } from '@angular/core';
import { ProfessorFormComponent } from '../../forms/professor-form/professor-form.component';
import { Professor } from '../../models/professor.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-professor-create',
  standalone: true,
  imports: [ProfessorFormComponent],
  templateUrl: './professor-create.component.html',
  styleUrl: './professor-create.component.scss'
})
export class ProfessorCreateComponent {
  @ViewChild('professorForm') professorFormComponent!: ProfessorFormComponent;

  constructor(
    private location: Location
  ) {}

  createProfessor(): void {
    this.professorFormComponent.submit();
  }

  backToProfessorList(): void {
    this.location.back();
  }

  saveProfessor(value: Professor): void {
    console.log('Aqui entra el guardar al docente')
  }
}
