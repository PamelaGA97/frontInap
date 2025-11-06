import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { Professor } from '../../models/professor.model';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { Faculty } from '../../../faculties/models/faculty.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { Course } from '../../../courses/model/course.model';
import { ScheduleTableComponent } from '../../../class-schedule/components/schedule-table/schedule-table.component';
import { ClassSchedule } from '../../../class-schedule/models/class-schedule.model';
import { firstValueFrom } from 'rxjs';
import { phoneNumberValidator } from '../../../../../shared/validations/phone-validation';
import { matchValidator } from '../../../../../shared/validations/validation-password';

@Component({
    selector: 'app-professor-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, BlockInvalidNumberKeysDirective, ScheduleTableComponent],
    templateUrl: './professor-form.component.html',
    styleUrl: './professor-form.component.scss'
})
export class ProfessorFormComponent {
  @ViewChild('classScheduleTable') classScheduleTable!: ScheduleTableComponent;
  @Input() professorData?: Professor;
  @Input() isPreview: boolean = false;
  @Output() submitFormEvent = new EventEmitter<Professor>();
  professorForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  faculties: Faculty[] = [];
  courses: Course[] = [];
  classSchedules: ClassSchedule[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private toastService: ToastService
  ) {
  }
  
  async ngOnInit(): Promise<void> {
    this.initialize();
    // await this.loadFaculties();
    // await this.addProfessorDataToForm();
  }
  
  private async initialize(): Promise<void> {
    this.initializeForm();
  }

  private initializeForm(): void {
    const isEditMode = !!this.professorData;
    this.professorForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      phone: ['', [Validators.required, phoneNumberValidator()]],
      rol: [UserRolEnum.PROFESSOR, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', isEditMode ? [] : [Validators.required]],
      confirmPassword: ['', isEditMode ? [] : [Validators.required]],
      salary: ['', [Validators.required]],
      isAvaible: [true, [Validators.required]],
      // course: ['', Validators.required],
      // faculty: ['', Validators.required],
    },
    { validators: matchValidator('password', 'confirmPassword') });
  }

  // private async loadFaculties(): Promise<void> {
  //   await firstValueFrom(this.facultyService.getAll())
  //   .then((response) => { this.faculties = response;})
  //   .catch(
  //     (error: ErrorHandler) => {
  //       this.toastService.showHttpError(error);
  //     }
  //   );
  // }

  private async addProfessorDataToForm(): Promise<void> {
    if (this.professorData) {
      this.professorForm.patchValue(this.professorData);
      // this.addFacultyToForm();
      // this.addCareerToForm();
    }
  }

  // private addFacultyToForm(): void {
  //   const facultyFounded = this.faculties.find((faculty)=>(faculty.id === this.professorData?.faculty?.id));
  //   this.professorForm.controls['faculty'].setValue(facultyFounded);
  //   this.loadCourses()
  // }

  // private addCareerToForm(): void {
  //   const courseFounded = this.courses.find((course)=>(course.id === this.professorData?.course?.id));
  //   this.professorForm.controls['course'].setValue(courseFounded);
  // }

  // loadCourses(): void {
  //   const faculty = this.professorForm.value.faculty;
  //   this.courses = faculty.courses;
  //   this.course.setValue('');
  // }

  submit(): void {
    this.professorForm.markAllAsTouched();
    if (this.professorForm.valid) {
      // this.classScheduleTable.submit();
      // const data = { 
      //   ...this.professorForm.value,
      //   classSchedules: this.classSchedules
      // }
      // this.submitFormEvent.emit(data);
      this.submitFormEvent.emit(this.professorForm.value);
    }
  }

  addClassHourSelected(classSchedules: ClassSchedule[]): void {
    this.classSchedules = classSchedules
  }

  get firstName() {
    return this.professorForm?.controls['firstName'];
  }

	get secondName() {
		return this.professorForm?.controls['secondName'];
	}

  get ci() {
		return this.professorForm?.controls['ci'];
	}

  get phone() {
		return this.professorForm?.controls['phone'];
	}

  // get career() {
  //   return this.professorForm.controls['career'];
  // }

  // get course() {
  //   return this.professorForm.controls['course'];
  // }

  // get faculty() {
  //   return this.professorForm.controls['faculty'];
  // }

  get salary() {
    return this.professorForm?.controls['salary']
  }

  get email() {
    return this.professorForm?.controls['email']
  }

  get password() {
    return this.professorForm?.controls['password']
  }

  get confirmPassword() {
    return this.professorForm.controls['confirmPassword']
  }

  get isAvaible() {
    return this.professorForm.controls['isAvaible']
  }
}
