import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { Faculty } from '../../models/faculty.model';
import { CareerTimeEnum } from '../../../careers/enums/career-time.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.scss'
})
export class FacultyFormComponent {
  @Input() facultyData?: Faculty;
  @Input() isPreview: boolean = false;
  @Output() submitFormEvent = new EventEmitter<Faculty>();
  facultyForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  courseTimes = Object.values(CareerTimeEnum);


  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.initialize();
  }

  ngOnInit(): void {
    this.addSecretaryDataToForm();
    console.log(this.facultyData)
  }
  
  private initialize(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.facultyForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      careers: this._formBuilder.array([this.createCareerGroup()]),
      courses: this._formBuilder.array([this.createCourseGroup()])
    });
  }

  private createCareerGroup(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      courseTime: ['', Validators.required]
    });
  }

  private createCourseGroup(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required]
    });
  }

  private addSecretaryDataToForm(): void {
    if (this.facultyData) {
      this.facultyForm.patchValue(this.facultyData);
      this.addCareersToForm();
    }
  }

  private addCareersToForm(): void {
    
  }

  submit(): void {
    if(this.facultyForm.valid) {
      const data = { ...this.facultyData, ...this.facultyForm.value }
      this.submitFormEvent.emit(data);
    }
  }

  addCareer(): void {
    this.careers.push(this.createCareerGroup());
  }

  addCourse(): void {
    this.courses.push(this.createCareerGroup());
  }

  removeCareer(index: number): void {
    this.careers.removeAt(index);
  }

  removeCourse(index: number): void {
    this.courses.removeAt(index);
  }

  get name() {
    return this.facultyForm.controls['name'];
  }

  get code() {
    return this.facultyForm.controls['code'];
  }

  get courseTime() {
    return this.facultyForm.controls['courseTime'];
  }

  get careers(): FormArray {
    return this.facultyForm.get('careers') as FormArray;
  }

  get courses(): FormArray {
    return this.facultyForm.get('courses') as FormArray;
  }
}
