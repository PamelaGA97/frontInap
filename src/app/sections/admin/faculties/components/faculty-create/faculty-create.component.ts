import { Component, ViewChild } from '@angular/core';
import { FacultyFormComponent } from '../../forms/faculty-form/faculty-form.component';
import { Faculty } from '../../models/faculty.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faculty-create',
  standalone: true,
  imports: [FacultyFormComponent],
  templateUrl: './faculty-create.component.html',
  styleUrl: './faculty-create.component.scss'
})
export class FacultyCreateComponent {
  @ViewChild('facultyForm') facultyFormComponent!: FacultyFormComponent;

  constructor (
    private location: Location 
  ) {}

  createfaculty(): void {
    this.facultyFormComponent.submit();
  }

  backTofacultyList(): void {
    this.location.back();
  }

  saveFaculty(faculty: Faculty): void {
    console.log(faculty)
    console.log('aqui se debe guardar la facultad')
  }
}
