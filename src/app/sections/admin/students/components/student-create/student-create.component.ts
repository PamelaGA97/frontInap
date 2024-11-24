import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { StudentFormComponent } from "../../forms/student-form/student-form.component";
import { Student } from '../../models/student.model';
import { Route, Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [StudentFormComponent],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.scss'
})
export class StudentCreateComponent {
	@ViewChild('studentForm') studenFormComponent!: StudentFormComponent;

  constructor(
    private location: Location,
    private router: Router
  ) {}

  createStudent(): void {
    this.studenFormComponent.submit();
  }

  backToStudentList(): void {
    this.location.back()
  }

  saveStudent(student: Student): void {
    console.log('Guardar en db el objeto:', student);
    this.router.navigate([adminPath, 'students'])
  }
}
