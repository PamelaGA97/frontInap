import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Faculty } from '../../../faculties/models/faculty.model';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { FacultyCourse } from '../../models/faculty-course.model';
import { firstValueFrom } from 'rxjs';
import { Professor } from '../../../professors/models/professor.model';
import { ScheduleTableComponent } from '../../../class-schedule/components/schedule-table/schedule-table.component';
import { ClassSchedule } from '../../../class-schedule/models/class-schedule.model';
import { ProfessorService } from '../../../professors/services/professors.service';
import { Course } from '../../../courses/model/course.model';
import { FacultyCourseStatus } from '../../enums/FacultyCourseStatus.enum';

@Component({
  selector: 'app-faculty-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ScheduleTableComponent, FormsModule],
  templateUrl: './faculty-course-form.component.html',
  styleUrl: './faculty-course-form.component.scss'
})
export class FacultyCourseFormComponent {
  @ViewChild('professorScheduleTable') classScheduleTable!: ScheduleTableComponent;
  @ViewChild('scheduleTable') scheduleTable!: ScheduleTableComponent;
  @Output() submitFormEvent = new EventEmitter<FacultyCourse>();
  facultyCourseForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  faculties: Faculty[] = [];
  courseList: Course[] = [];
  professorsList: Professor[] = [];
  courseSelected: string = '';
  professorSelected?: Professor;
  scheduleTableList: ClassSchedule[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private toastService: ToastService,
    private professorService: ProfessorService
  ) {}
  
  async ngOnInit(): Promise<void> {
    this.initialize();
    await this.loadFaculties();
  }

  private initialize(): void {
    this.createForm();
  }

  private createForm(): void {
    this.facultyCourseForm = this.formBuilder.group({
      name: ['', Validators.required],
      room: ['', Validators.required],
      amount: ['', Validators.required],
      initDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      faculty: ['', Validators.required],
    });
  }

  private async loadFaculties(): Promise<void> {
    await firstValueFrom(this.facultyService.getAll()).then(
      (facultyList: Faculty[]) => {
        this.faculties = facultyList;
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  async loadProfessors(event: any): Promise<void> {
    const courseName = event.target.value;
    const queryParams = {
      faculty: this.faculty.value.name,
      course: courseName
    }
    await firstValueFrom(this.professorService.getAll(queryParams)).then(
      (professors: Professor[]) => {
        this.professorsList = professors;
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  async loadCourses(): Promise<void> {
    this.courseList = [];
    const faculty = this.facultyCourseForm.value.faculty;
    this.courseList = faculty.courses;
    //this.career.setValue('');
  }

  submit(): void {
    if(this.facultyCourseForm.valid) {
      const payload = this.createPayload();
      this.submitFormEvent.emit(payload);
    }
  }
  
  private createPayload(): any {
    const formData = this.facultyCourseForm.value;
    const classSchedeule = this.scheduleTable.classSchedulesSelected;
    const facultyForm = {...formData, ... {professorSchedules: classSchedeule}};
    const payload = {...facultyForm, ...{status: FacultyCourseStatus.CREATED}};
    return payload;
  }

  addClassHourSelected(classSchedule: ClassSchedule[]): void {
    console.log(classSchedule)
    this.scheduleTable.reload()
  }

  setProfessor(event: any): void {
    const professorFullName: string  = event.target.value;
    const professorFounded = this.professorsList.find(
      (professor: Professor) => `${professor.user.firstName} ${professor.user.secondName}` === professorFullName);
    if (professorFounded) {
      this.professorSelected = professorFounded;
    }
  }

  removeStudent(index: number): void {
    this.students.removeAt(index);
  }

  private createStudentGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  addStudent(): void {
    this.students.push(this.createStudentGroup());
  }

  addProfessorScheduleSelected(classSchedule: ClassSchedule): void {
    this.scheduleTable.optionSelected(classSchedule.day, classSchedule.hour, this.professorSelected);
  }

  get faculty() {
    return this.facultyCourseForm.controls['faculty'];
  }

  get career() {
    return this.facultyCourseForm.controls['career'];
  }

  get students(): FormArray {
    return this.facultyCourseForm.get('students') as FormArray;
  }
}
