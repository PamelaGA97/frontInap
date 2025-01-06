import { Component, EventEmitter, Output } from '@angular/core';
import { StudentService } from '../../../students/services/student.service';
import { firstValueFrom } from 'rxjs';
import { Student } from '../../../students/models/student.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ModalService } from '../../../../../core/services/modal/modal.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';

@Component({
  selector: 'app-add-studen-to-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-studen-to-course-form.component.html',
  styleUrl: './add-studen-to-course-form.component.scss'
})
export class AddStudenToCourseFormComponent {
  @Output() submitStudentDataForm = new EventEmitter<Student>();
  studentList: Student[] = [];
  studentForm!: FormGroup;
  studentSelected?: Student;

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    public activeModal: ModalService,
    private swalService: SwalService
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
      student: [null, Validators.required]
    });
  }

  submit(): void {

  }

  addStudent(): void {
    if (this.studentSelected) {
      const formData = { student: this.studentSelected };
      this.activeModal.dismiss({data: formData})
    } else {
      this.swalService.openAlertModal('Error', 'Debes seleccionar un estudiante');
    }
  }

  closeModal(): void {
    this.activeModal.close();
  }

  setUser(data: any): void {
    console.log(data)
  }
}
