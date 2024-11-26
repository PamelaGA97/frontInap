import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { Professor } from '../../models/professor.model';

@Component({
  selector: 'app-professor-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BlockInvalidNumberKeysDirective],
  templateUrl: './professor-form.component.html',
  styleUrl: './professor-form.component.scss'
})
export class ProfessorFormComponent {
  @Output() submitFormEvent = new EventEmitter<Professor>();
  professorForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.initializeForm();
  }

  initializeForm(): void {
    this.professorForm = this.formBuilder.group({
      career: ['', Validators.required],
      course: ['', Validators.required],
      faculty: ['', Validators.required],
      user: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        secondName: ['', [Validators.required]],
        rol: [UserRolEnum.TEACHER, [Validators.required]],
        ci: ['', [Validators.required]],
        cellphone: ['', [Validators.required]],
      })
    });
  }

  submit(): void {
    if (this.professorForm.valid) {
      this.submitFormEvent.emit(this.professorForm.value);
    }
  }

  get firstName() {
    return this.professorForm?.controls['user'].get('firstName');
  }

	get secondName() {
		return this.professorForm?.controls['user'].get('secondName');
	}

  get ci() {
		return this.professorForm?.controls['user'].get('ci');
	}

  get cellphone() {
		return this.professorForm?.controls['user'].get('cellphone');
	}

  get career() {
    return this.professorForm.controls['career'];
  }

  get course() {
    return this.professorForm.controls['course'];
  }

  get faculty() {
    return this.professorForm.controls['faculty'];
  }
}
