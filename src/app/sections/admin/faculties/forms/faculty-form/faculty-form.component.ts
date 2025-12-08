import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { Faculty } from '../../models/faculty.model';
import { CareerTimeEnum } from '../../../careers/enums/career-time.enum';
import { CommonModule } from '@angular/common';
import { Career } from '../../../careers/models/career.model';
import { Course } from '../../../courses/model/course.model';

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
  }
  
  private initialize(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.facultyForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      degrees: this._formBuilder.array([this.createCareerGroup()]),
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
      this.addDegreesToForm();
      this.addCoursesToForm();
      this.facultyForm.patchValue(this.facultyData);
    }
  }

  private addDegreesToForm(): void {
    this.degrees.clear();
    this.facultyData?.degrees?.map((career: Career) => {
      this.degrees.push(this.createCareerGroup());
    });
  }

  private addCoursesToForm(): void {
    this.courses.clear();
    this.facultyData?.courses?.map((course: Course) => {
      this.courses.push(this.createCourseGroup());
    });
  }


  submit(): void {
    if(this.facultyForm.valid) {
      const data = { ...this.facultyData, ...this.facultyForm.value }
      this.submitFormEvent.emit(data);
    } else {
      console.log(this.facultyForm.valid)
      console.log(this.facultyForm.value)
    }
  }

  addCareer(): void {
    this.degrees.push(this.createCareerGroup());
  }

  addCourse(): void {
    this.courses.push(this.createCourseGroup());
  }

  removeDegree(index: number): void {
    this.degrees.removeAt(index);
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

  get degrees(): FormArray {
    return this.facultyForm.get('degrees') as FormArray;
  }

  get courses(): FormArray {
    return this.facultyForm.get('courses') as FormArray;
  }
}
