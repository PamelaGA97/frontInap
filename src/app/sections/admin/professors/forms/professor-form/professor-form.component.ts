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
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { Course } from '../../../courses/model/course.model';
import { ScheduleTableComponent } from '../../../class-schedule/components/schedule-table/schedule-table.component';
import { ClassSchedule } from '../../../class-schedule/models/class-schedule.model';
import { ClassScheduleComponent } from '../../../class-schedule/class-schedule.component';

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
  @Output() submitFormEvent = new EventEmitter<Professor>();
  professorForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  faculties: Faculty[] = [];
  courses: Course[] = [];
  days: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  times: string[] = ['7:30 - 9:00', '9:00 - 10:30', '10:30 - 12:00', '12:00 - 13:30', '14:00 - 15:30', '15:30 - 17:00', '17:00 - 18:30', '18:30 - 20:00']
  classSchedules: ClassSchedule[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private toastService: ToastService
  ) {
    this.initialize();
  }
  
  private initialize(): void {
    this.initializeForm();
    this.loadFaculties();
  }

  private initializeForm(): void {
    this.professorForm = this.formBuilder.group({
      course: ['', Validators.required],
      faculty: ['', Validators.required],
      user: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        secondName: ['', [Validators.required]],
        rol: [UserRolEnum.TEACHER, [Validators.required]],
        ci: ['', [Validators.required]],
        cellphone: ['', [Validators.required]],
      }),
    });
  }

  private loadFaculties(): void {
    this.facultyService.getAll().subscribe(
      (response) => {
        this.faculties = response;
    }, (error: ErrorHandler) => {
      this.toastService.showHttpError(error);
    });
  }

  loadCourses(): void {
    const faculty = this.professorForm.value.faculty;
    this.courses = faculty.courses;
  }

  submit(): void {
    if (this.professorForm.valid) {
      this.classScheduleTable.submit();
      const data = { 
        ...this.professorForm.value,
        classSchedules: this.classSchedules
      }
      this.submitFormEvent.emit(data);
    }
  }

  addClassHourSelected(classSchedules: ClassSchedule[]): void {
    this.classSchedules = classSchedules
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
