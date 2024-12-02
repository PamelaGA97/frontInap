import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { Faculty } from '../../models/faculty.model';

@Component({
  selector: 'app-faculty-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.scss'
})
export class FacultyFormComponent {
  @Output() submitFormEvent = new EventEmitter<Faculty>();

  facultyForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.facultyForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      careers: this._formBuilder.array([]),
      courses: this._formBuilder.array([])
    });
  }

  submit(): void {
    if(this.facultyForm.valid) {
      this.submitFormEvent.emit(this.facultyForm.value);
    } else {
      console.log('Algo paso con el formulario de creado')
    }
  }

  addCareer(): void {
    const career = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.careers.push(career);
  }

  addCourse(): void {
    const course = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.courses.push(course);
  }

  removeCareer(index: number): void {
    this.careers.removeAt(index);
  }

  removeCourse(index: number): void {
    this.courses.removeAt(index);
  }

  get name() {
    return this.facultyForm.controls['name'];
  }

  get code() {
    return this.facultyForm.controls['name'];
  }

  get careers(): FormArray {
    return this.facultyForm.get('careers') as FormArray;
  }

  get courses(): FormArray {
    return this.facultyForm.get('courses') as FormArray;
  }
}
