import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Faculty } from '../../../faculties/models/faculty.model';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { FacultyCourse } from '../../models/faculty-course.model';

@Component({
  selector: 'app-faculty-course-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './faculty-course-form.component.html',
  styleUrl: './faculty-course-form.component.scss'
})
export class FacultyCourseFormComponent {
  @Output() submitFormEvent = new EventEmitter<FacultyCourse>();
  facultyCourseForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  faculties: Faculty[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private facultyService: FacultyService,
    private toastService: ToastService
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.createForm();
    this.loadFaculties();
  }

  private createForm(): void {
    this.facultyCourseForm = this.formBuilder.group({
      faculty: ['', Validators.required],
      course: ['', Validators.required],
      initDate: ['', Validators.required],
      finishDate: ['', Validators.required]
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

  submit(): void {
    if(this.facultyCourseForm.valid) {
      this.submitFormEvent.emit(this.facultyCourseForm.value);
    }
  }

  get faculty() {
    return this.facultyCourseForm.controls['faculty'];
  }
}
