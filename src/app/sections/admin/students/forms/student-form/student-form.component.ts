import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { Faculty } from '../../../faculties/models/faculty.model';
import { Career } from '../../../careers/models/career.model';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { matchValidator } from '../../../../../shared/validations/validation-password';
import { User } from '../../../users/model/user.model';
import { generateYearList, parseDateYearToNumber } from '../../../../../core/utils/date.utils';

@Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, BlockInvalidNumberKeysDirective],
    templateUrl: './student-form.component.html',
    styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {
  @Input() studentData?: User;
  @Input() isPreview: boolean = false;
  @Output() submitFormEvent = new EventEmitter<User>();
  studentForm!: FormGroup;
  formStatusEnum = FormStatus;
  validationErrorMessage = ValidatioErrorMessage;
  minYear: string[] = [];
  faculties: Faculty[] = [];
  careerList: Career[] = [];
  years: number[] = [];
  initialYear: number = 2000;

  constructor(
    private _formBuilder: FormBuilder,
    private facultyService: FacultyService,
  ) {
  }
  
  ngOnInit(): void {
    this.initialize();
    this.loadFormValues();
    this.addStudentDataToForm();
  }
  
  private initialize(): void {
    this.initializeForm();
  }

  private async loadFormValues(): Promise<void> {
    this.years = generateYearList(this.initialYear);
    // await this.loadFaculties();
  }

  private initializeForm(): void {
    const isEditMode = !!this.studentData;
    this.studentForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      rol: [UserRolEnum.STUDENT, [Validators.required]],
      isAvaible: [true, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', isEditMode ? [] : [Validators.required]],
      confirmPassword: ['', isEditMode ? [] : [Validators.required]],
      highschool: ['', [Validators.required]],
      graduationYear: ['', [Validators.required]],

      // faculty: [null, [Validators.required]],
      // career: ['', [Validators.required]],
    },{ validators: matchValidator('password', 'confirmPassword') });
  }

  // private async loadFaculties(): Promise<void> {
  //   await firstValueFrom(this.facultyService.getAll())
  //     .then((response) => {
  //       this.faculties = response;
  //     }).catch((error) => {
  //       console.error(error);
  //     });
  // }

  // private generateYears(): void {
  //   const currentYear = new Date().getFullYear();
  //   const startYear = 2000;
  //   this.years = Array.from(
  //     { length: currentYear - startYear + 1 },
  //     (_, i) => new Date(`${currentYear - i}-01-01T03:00:00.000Z`).getFullYear()
  //   );
  // }

  private async addStudentDataToForm(): Promise<void> {
    if(this.studentData){
      this.studentForm.patchValue(this.studentData);
      await this.addGraduationYearToForm();
      // this.addFacultyToForm();
      // this.addCareerToForm();
    }
  }

  private async addGraduationYearToForm(): Promise<void> {
    const generateYears = await parseDateYearToNumber(this.studentData?.graduationYear);
    this.studentForm.controls['graduationYear'].setValue(generateYears);
  }

  // private addFacultyToForm(): void {
  //   const facultyFounded = this.faculties.find((faculty)=>(faculty.id === this.studentData?.faculty?.id));
  //   this.studentForm.controls['faculty'].setValue(facultyFounded);
  //   this.loadCareers();
  // }

  // private addCareerToForm(): void {
  //   const careerFounded = this.careerList.find((career)=>(career.id === this.studentData?.career?.id));
  //   this.studentForm.controls['career'].setValue(careerFounded);
  // }

  // private parseDateTuNumber(): number {
  //   return this.studentData?.graduationYear ? new Date(this.studentData.graduationYear).getFullYear() : 2024;
  // }

  loadCareers(): void {
    const faculty = this.studentForm.value.faculty;
    this.careerList = faculty.careers;
    // this.career.setValue('')
  }

  submit(): void {
    this.studentForm.markAllAsTouched();
    if (this.studentForm.valid) {
      this.setGraduationDateFormat()
      this.submitFormEvent.emit(this.studentForm.value);
    }
  }

  private setGraduationDateFormat(): void {
    const dateString = new Date(`${this.studentForm.value.graduationYear}-01-01T00:00:00.000Z`).toISOString();
    this.studentForm.controls['graduationYear'].setValue(dateString);
  }

  get firstName() {
    return this.studentForm?.controls['firstName'];
  }

	get secondName() {
		return this.studentForm?.controls['secondName'];
	}

  get ci() {
		return this.studentForm?.controls['ci'];
	}

  get phone() {
		return this.studentForm?.controls['phone'];
	}

  get email() {
    return this.studentForm?.controls['email'];
  }

  get password() {
    return this.studentForm?.controls['password'];
  }

  get confirmPassword() {
    return this.studentForm.controls['confirmPassword'];
  }

  get highschool() {
    return this.studentForm.controls['highschool'];
  }

  get graduationYear () {
    return this.studentForm.controls['graduationYear'];
  }

  get isAvaible() {
    return this.studentForm.controls['isAvaible'];
  }

  // get career() {
  //   return this.studentForm.controls['career'];
  // }

  // get faculty() {
  //   return this.studentForm.controls['faculty']
  // }
}
