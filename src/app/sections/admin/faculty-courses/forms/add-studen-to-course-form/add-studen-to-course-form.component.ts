import { Component, EventEmitter, Output } from '@angular/core';
import { StudentService } from '../../../students/services/student.service';
import { firstValueFrom } from 'rxjs';
import { Student } from '../../../students/models/student.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';

@Component({
  selector: 'app-add-studen-to-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-studen-to-course-form.component.html',
  styleUrl: './add-studen-to-course-form.component.scss'
})
export class AddStudenToCourseFormComponent {
  @Output() submitStudentDataForm = new EventEmitter<Student>();
  studentList: Student[] = [];
  studentForm!: FormGroup;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.initialize();
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    firstValueFrom(this.studentService.getAll())
      .then((students: Student[]) => {
        this.studentList = students;
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  private initialize(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  submit(): void {

  }

  addStudent(): void {
    console.log('Admin')
  }
}
