import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      name: ['', Validators.required]
    });
  }

  submit(): void {
    if(this.facultyForm.valid) {
      this.submitFormEvent.emit(this.facultyForm.value);
    }
  }

  get name() {
    return this.facultyForm.controls['name'];
  }
}
