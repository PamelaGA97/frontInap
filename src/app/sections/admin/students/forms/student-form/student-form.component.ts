import { Component, ErrorHandler, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { Student } from '../../models/student.model';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { Faculty } from '../../../faculties/models/faculty.model';
import { Career } from '../../../careers/models/career.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockInvalidNumberKeysDirective],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {
  studentForm!: FormGroup;
  @Output() submitFormEvent = new EventEmitter<Student>();
  formStatusEnum = FormStatus;
  validationErrorMessage = ValidatioErrorMessage;
  minYear: string[] = [];
  faculties: Faculty[] = [];
  careers: Career[] = [];
  years: number[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private facultyService: FacultyService,
  ) {
    this.initialize();
  }
  
  private initialize() {
    this.initializeForm();
    this.loadFaculties();
    this.generateYears();
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

  private loadFaculties(): void {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response;
    }, (error) => {
      console.error(error);
    });
  }

  private generateYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    this.years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => currentYear - i
    );
  }

  loadCareers(): void {
    const faculty = this.studentForm.value.faculty;
    this.careers = faculty.careers;
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
