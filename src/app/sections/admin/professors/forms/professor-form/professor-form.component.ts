import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { Faculty } from '../../../faculties/models/faculty.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ScheduleTableComponent } from '../../../class-schedule/components/schedule-table/schedule-table.component';
import { ClassSchedule } from '../../../class-schedule/models/class-schedule.model';
import { firstValueFrom, Subject } from 'rxjs';
import { phoneNumberValidator } from '../../../../../shared/validations/phone-validation';
import { matchValidator } from '../../../../../shared/validations/validation-password';
import { User } from '../../../users/model/user.model';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';
import { Degree } from '../../../degrees/models/degree.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FacultySelectComponent } from '../../../../../shared/components/faculty-select/faculty-select.component';
import { Course } from '../../../courses/model/course.model';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { TeacherScheduleComponent } from '../../../../../shared/components/teacher-schedule/teacher-schedule.component';

@Component({
    selector: 'app-professor-form',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      CommonModule,
      BlockInvalidNumberKeysDirective,
      FacultySelectComponent,
      TeacherScheduleComponent
    ],
    templateUrl: './professor-form.component.html',
    styleUrl: './professor-form.component.scss'
})
export class ProfessorFormComponent {
  @ViewChild('classScheduleTable') classScheduleTable!: ScheduleTableComponent;
  @Input() professorData?: User;
  @Input() isPreview: boolean = false;
  @Output() submitFormEvent = new EventEmitter<User>();
  professorForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  faculties: Faculty[] = [];
  classSchedules: ClassSchedule[] = [];
	courseList: Degree[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _facultyService: FacultyService,
    private _toastService: ToastService,
  ) {
  }
  
  ngOnInit(): void {
    this.initialize();
    this.addProfessorDataToForm();
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
      faculty: [null, Validators.required],
      courseToAdd: [''],
      courses: this._formBuilder.array([], Validators.required),
      scheduleAvailabilities: [null],
    },
    { validators: matchValidator('password', 'confirmPassword') });
  }

  private createCourseFormGroup(course: Course): FormGroup {
    return this._formBuilder.group({
      id: [course.id, Validators.required],
      name: [course.name, Validators.required],
      //facultyName: [facultyName || this.getSelectedFacultyName(), Validators.required]
    });
  }

  private getSelectedFacultyName(): string {
    const facultyId = this.faculty.value;
    const selectedFaculty = this.faculties.find(f => f.id === facultyId);
    return selectedFaculty?.name || '';
  }

  private async addProfessorDataToForm(): Promise<void> {
    if (this.professorData) {
      this.professorForm.patchValue({
        ...this.professorData,
        faculty: this.professorData.faculty?.id,
      });
      
      if (this.professorData.faculty?.id) {
        await this.loadCourses(this.professorData.faculty.id);
      }
      
      if (this.professorData.courses && this.professorData.courses.length > 0) {
        this.professorData.courses.forEach(course => {
          this.courses.push(this.createCourseFormGroup(course));
        });
      }
    }
  }

  submit(): void {
    this.professorForm.markAllAsTouched();
    console.log(this.professorForm.value);
    if (this.professorForm.valid) {
      console.log('valido')
      // this.classScheduleTable.submit();
      // const data = { 
      //   ...this.professorForm.value,
      //   classSchedules: this.classSchedules
      // }
      // this.submitFormEvent.emit(data);
      this.submitFormEvent.emit(this.professorForm.value);
    } else {
      console.log('invalido')
      console.log(this.professorForm)
    }
  }

  addClassHourSelected(classSchedules: ClassSchedule[]): void {
    this.classSchedules = classSchedules
  }

  async loadCourses($facultyId: string): Promise<void> {
    await firstValueFrom(this._facultyService.getCourses($facultyId))
      .then(
        (response: PaginationResponse<Course>) => {
          this.courseList = response.data;
        }
      ).catch((error: Partial<HttpErrorResponse>) => {
        this._toastService.showHttpError(error.error);
      });
  }

  addCourse(): void {
    const courseId = this.courseToAdd.value;
    
    if (!courseId) {
      this._toastService.showToast('Debe seleccionar un curso', '', AlertType.WARNING);
      return;
    }

    // Verificar si el curso ya fue agregado
    const courseExists = this.courses.value.some((course: Course) => course.id === courseId);
    
    if (courseExists) {
      this._toastService.showToast('Este curso ya fue agregado', '', AlertType.WARNING);
      return;
    }

    // Buscar el curso en la lista y agregarlo al FormArray
    const courseToAdd = this.courseList.find(course => course.id === courseId);
    
    if (courseToAdd) {
      this.courses.push(this.createCourseFormGroup(courseToAdd as Course));
      this.courseToAdd.setValue('');
      this._toastService.showToast('Curso agregado correctamente', '', AlertType.SUCCESS);
    }
  }

  removeCourse(index: number): void {
    this.courses.removeAt(index);
    this._toastService.showToast('Curso eliminado correctamente', '', AlertType.SUCCESS);
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

  get salary() {
    return this.professorForm?.controls['salary'];
  }

  get email() {
    return this.professorForm?.controls['email'];
  }

  get password() {
    return this.professorForm?.controls['password'];
  }

  get confirmPassword() {
    return this.professorForm.controls['confirmPassword'];
  }

  get isAvaible() {
    return this.professorForm.controls['isAvaible'];
  }

	get faculty() {
		return this.professorForm.controls['faculty'];
	}

  get courseToAdd() {
    return this.professorForm.controls['courseToAdd'];
  }

  get courses(): FormArray {
    return this.professorForm.get('courses') as FormArray;
  }

  ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
