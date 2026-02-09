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
import { TeacherAvailability } from '../../../../../shared/components/teacher-schedule/models/teacher-availability.model';
import { TeacherSubject } from '../../models/teacher-subject.model';

@Component({
    selector: 'app-professor-form',
    standalone: true,
    imports: [
      ReactiveFormsModule,
      CommonModule,
      BlockInvalidNumberKeysDirective,
      FacultySelectComponent,
      TeacherScheduleComponent,
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
	courseList: Course[] = [];

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
    if (this.professorData && this.professorData.teacherAvailabilities) {
      // this.teacherScheduleAvailabilities = this.professorData.teacherAvailabilities;
      // this.professorForm.patchValue({
      //   ...this.professorData,
      // });
      this.professorForm.controls['teacherAvailabilities'].setValue(this.professorData.teacherAvailabilities);
    }
    console.log(this.professorForm.value)
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

      selectedFaculty: [''],
      selectedCourse: [''],

      teacherSubjects: this._formBuilder.array([], Validators.required),
      teacherAvailabilities: [[]],
    },
    { validators: matchValidator('password', 'confirmPassword') });
  }

  private createCourseFormGroup(course: Course): FormGroup {
    return this._formBuilder.group({
      id: [course.id, Validators.required],
      name: [course.name, Validators.required],
    });
  }

  private async addProfessorDataToForm(): Promise<void> {
    if (this.professorData) {
      this.professorForm.patchValue({
        ...this.professorData,
        faculty: this.professorData.faculty?.id,
      });
      
      // if (this.professorData.faculty?.id) {
      //   await this.loadCourses(this.professorData.faculty.id);
      // }
      
      // if (this.professorData.courses && this.professorData.courses.length > 0) {
      //   this.professorData.courses.forEach(course => {
      //     this.courses.push(this.createCourseFormGroup(course));
      //   });
      // }
    }
  }

  submit(): void {
    this.professorForm.markAllAsTouched();
    if (this.professorForm.valid) {
      console.log('valido')
      this.submitFormEvent.emit(this.professorForm.value);
    } else {
      console.log('invalido')
      console.log(this.professorForm)
    }
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

  // addCourse(): void {
  //   const courseId = this.professorForm.value.selectedCourse.id;
    
  //   if (!courseId) {
  //     this._toastService.showToast('Debe seleccionar un curso', '', AlertType.WARNING);
  //     return;
  //   }

  //   const courseExists = this.courses.value.some((course: Course) => course.id === courseId);
    
  //   if (courseExists) {
  //     this._toastService.showToast('Este curso ya fue agregado', '', AlertType.WARNING);
  //     return;
  //   }

  //   const courseToAdd = this.courseList.find(course => course.id === courseId);
    
  //   if (courseToAdd) {
  //     this.courses.push(this.createCourseFormGroup(courseToAdd as Course));
  //     this._toastService.showToast('Curso agregado correctamente', '', AlertType.SUCCESS);
  //   }
  // }

  createTeacherSubjectFormGroup(teacherSubject: TeacherSubject): FormGroup {
    return this._formBuilder.group({
      faculty: [teacherSubject.faculty, Validators.required],
      course: [teacherSubject.course, Validators.required],
    });
  }

  async addTeacherSubject(): Promise<void> {
    const facultyId = this.selectedFaculty.value;
    const courseId = this.selectedCourse.value;

    console.log('f: ', facultyId);
    console.log('c: ', courseId);

    if (!facultyId || !courseId) {
      this._toastService.showToast('Debe seleccionar una facultad y una materia', '', AlertType.WARNING);
    }

    const teacherSubjectFounded = this.teacherSubjects.value.some(
      (teacherSubject: TeacherSubject) => teacherSubject.course.id === courseId && teacherSubject.faculty.id === facultyId 
    );

    if (teacherSubjectFounded) {
      this._toastService.showToast('La materia ya fue agregada.', '', AlertType.WARNING);
      return;
    }

    const course = this.courseList.find((course => course.id === courseId));
    const faculty = await this.getFacultyForId(facultyId);
    console.log(course)
    console.log(faculty)
    
    if (course && faculty) {
      const teacherSubject: TeacherSubject = {
        faculty: faculty,
        course: course,
      }
      this.teacherSubjects.push(this.createTeacherSubjectFormGroup(teacherSubject));
    }
  }

  async getFacultyForId(id: string): Promise<Faculty> {
    const faculty = await firstValueFrom(this._facultyService.get(id))
      .then((faculty: Faculty) => {
        return faculty;
      }).catch((error: Partial<HttpErrorResponse>) => {
        this._toastService.showHttpError(error.error);
      });
    
    return faculty as Faculty;
  }

  removeTeacherSubject(index: number): void {
    this.teacherSubjects.removeAt(index);
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

	get selectedFaculty() {
		return this.professorForm.controls['selectedFaculty'];
	}

  get selectedCourse() {
    return this.professorForm.controls['selectedCourse'];
  }

  get teacherSubjects() {
    return this.professorForm.controls['teacherSubjects'] as FormArray;
  }

  // get courses(): FormArray {
  //   return this.professorForm.get('courses') as FormArray;
  // }

  ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
