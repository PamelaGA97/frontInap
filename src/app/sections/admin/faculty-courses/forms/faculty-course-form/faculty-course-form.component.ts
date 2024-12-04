import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Faculty } from '../../../faculties/models/faculty.model';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { FacultyCourse } from '../../models/faculty-course.model';
import { firstValueFrom } from 'rxjs';
import { Career } from '../../../careers/models/career.model';
import { Professor } from '../../../professors/models/professor.model';
import { ScheduleTableComponent } from '../../../class-schedule/components/schedule-table/schedule-table.component';
import { ClassSchedule } from '../../../class-schedule/models/class-schedule.model';
import { ProfessorService } from '../../../professors/services/professors.service';

@Component({
  selector: 'app-faculty-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ScheduleTableComponent],
  templateUrl: './faculty-course-form.component.html',
  styleUrl: './faculty-course-form.component.scss'
})
export class FacultyCourseFormComponent {
  @ViewChild('classScheduleTable') classScheduleTable!: ScheduleTableComponent;
  @Output() submitFormEvent = new EventEmitter<FacultyCourse>();
  facultyCourseForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  faculties: Faculty[] = [];
  careerList: Career[] = [];
  professorsList: Professor[] = [];

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
      room: ['', Validators.required],
      amount: ['', Validators.required],
      initDate: ['', Validators.required],
      finishDate: ['', Validators.required],
      faculty: ['', Validators.required],
      career: ['', Validators.required],
      professors: [],
      students: this.formBuilder.array([this.createStudentGroup()])
      
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

  async loadProfessors(): Promise<void> {
    await firstValueFrom(this.professorService.getAll()).then(
      (professors: Professor[]) => {
        this.professorsList = professors;
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  async loadCareers(): Promise<void> {
    const faculty = this.facultyCourseForm.value.faculty;
    this.careerList = faculty.careers;
    this.career.setValue('');
  }

  submit(): void {
    if(this.facultyCourseForm.valid) {
      this.submitFormEvent.emit(this.facultyCourseForm.value);
    }
  }

  addClassHourSelected(classSchedule: ClassSchedule[]): void {
    console.log(classSchedule)
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
