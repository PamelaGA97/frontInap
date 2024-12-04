import { Component, ErrorHandler, EventEmitter, Input, Output } from '@angular/core';
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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockInvalidNumberKeysDirective],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {
  @Input() studentData!: Student;
  @Output() submitFormEvent = new EventEmitter<Student>();
  studentForm!: FormGroup;
  formStatusEnum = FormStatus;
  validationErrorMessage = ValidatioErrorMessage;
  minYear: string[] = [];
  faculties: Faculty[] = [];
  careerList: Career[] = [];
  years: number[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private facultyService: FacultyService,
  ) {
  }
  
  async ngOnInit(): Promise<void> {
    await this.initialize();
    this.addStudentDataToForm()
  }
  
  private async initialize() {
    this.initializeForm();
    await this.loadFaculties();
    await this.generateYears();
  }

  private initializeForm(): void {
    this.studentForm = this._formBuilder.group({
      highschool: ['', [Validators.required]],
      graduationYear: ['', [Validators.required]],
      faculty: [null, [Validators.required]],
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

  private async loadFaculties(): Promise<void> {
    await firstValueFrom(this.facultyService.getAll())
      .then((response) => {
        this.faculties = response;
      }).catch((error) => {
        console.error(error);
      });
  }

  private generateYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    this.years = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => new Date(`${currentYear - i}-01-01T03:00:00.000Z`).getFullYear()
    );
  }

  private addStudentDataToForm(): void {
    if(this.studentData){
      this.studentForm.patchValue(this.studentData);
      this.addGraduationYearToForm();
      this.addFacultyToForm();
      this.addCareerToForm();
    }
  }

  private addGraduationYearToForm(): void {
    const generateYears = this.parseDateTuNumber();
    this.studentForm.controls['graduationYear'].setValue(generateYears);
  }

  private addFacultyToForm(): void {
    const facultyFounded = this.faculties.find((faculty)=>(faculty.id === this.studentData?.faculty?.id));
    this.studentForm.controls['faculty'].setValue(facultyFounded);
    this.loadCareers();
  }

  private addCareerToForm(): void {
    const careerFounded = this.careerList.find((career)=>(career.id === this.studentData?.career?.id));
    this.studentForm.controls['career'].setValue(careerFounded);
  }

  private parseDateTuNumber(): number {
    return this.studentData.graduationYear ? new Date(this.studentData.graduationYear).getFullYear() : 2024;
  }

  loadCareers(): void {
    const faculty = this.studentForm.value.faculty;
    this.careerList = faculty.careers;
    this.career.setValue({faculty: null})
  }

  submit(): void {
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
