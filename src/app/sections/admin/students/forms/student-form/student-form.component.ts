import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { Student } from '../../models/student.model';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, BlockInvalidNumberKeysDirective],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {
  studentForm!: FormGroup;
  @Output() submitFormEvent = new EventEmitter<Student>();
  formStatusEnum = FormStatus;
  validationErrorMessage = ValidatioErrorMessage;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.studentForm = this._formBuilder.group({
      highschool: ['', [Validators.required]],
      graduationYear: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      career: ['', [Validators.required]],
      user: this._formBuilder.group({
        firstName: ['', [Validators.required]],
        secondName: ['', [Validators.required]],
        rol: [UserRolEnum.STUDENT, [Validators.required]],
        ci: ['', [Validators.required]],
        cellphone: ['', [Validators.required]],
      })
    })
  }

  isInvalidForm(): boolean {
    let isValid = false;
    if(this.studentForm.valid) {

    }
    return isValid;
  }

  submit(): void {
    if (this.studentForm.valid) {
      this.submitFormEvent.emit(this.studentForm.value);
    }
  }

  get firstName() {
    return this.studentForm?.controls['user'].get('firstName');
  }

	get secondName() {
		return this.studentForm?.controls['user'].get('secondName');
	}

  get ci() {
		return this.studentForm?.controls['user'].get('ci');
	}

  get cellphone() {
		return this.studentForm?.controls['user'].get('cellphone');
	}

  get highschool() {
    return this.studentForm?.controls['highschool'];
  }

  get graduationYear() {
    return this.studentForm.controls['graduationYear'];
  }

  get career() {
    return this.studentForm.controls['career'];
  }

  get faculty() {
    return this.studentForm.controls['faculty']
  }
}
