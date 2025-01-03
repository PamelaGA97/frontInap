import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyCoursesStorageService } from '../../services/faculty-courses-storage.service';
import { FacultyCourse } from '../../models/faculty-course.model';
import { Student } from '../../../students/models/student.model';
import { PaymentStatus } from '../../../students/enums/payment-status.enum';
import { StudentService } from '../../../students/services/student.service';
import { firstValueFrom } from 'rxjs';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { FacultyCourseService } from '../../services/faculty-course.service';
import { ModalService } from '../../../../../core/services/modal/modal.service';
import { AddStudenToCourseFormComponent } from '../../../inscriptions/forms/add-studen-to-course-form/add-studen-to-course-form.component';

@Component({
  selector: 'app-faculty-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-course-detail.component.html',
  styleUrl: './faculty-course-detail.component.scss'
})
export class FacultyCourseDetailComponent {
  facultyCourseId: string = '';
  facultyCourse?: FacultyCourse;
  studentList?: Student[] = [];
  paymentStatus = PaymentStatus;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private facultyCoursesStorageService: FacultyCoursesStorageService,
    private studentService: StudentService,
    private toastService: ToastService,
    private facultyCourseService: FacultyCourseService,
    private modalService: ModalService
  ) {
    this.initialize();
  }

  async ngOnInit(): Promise<void> {
    this.loadFacultyCourseDetail();
    await this.loadStudents();
  }

  private initialize(): void {
    this.getFacultyCourseId();
  }

  private getFacultyCourseId(): void {
    this.facultyCourseId = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  private loadFacultyCourseDetail(): void {
    firstValueFrom(this.facultyCourseService.get(this.facultyCourseId))
      .then((facultyCourse: FacultyCourse) => {
        this.facultyCourse = facultyCourse;
        console.log(this.facultyCourse)
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
    
  }

  backToFacultyCourseList(): void {
    this.location.back();
  }

  private async loadStudents(): Promise<void> {
    await firstValueFrom(this.studentService.getAll())
      .then((students: Student[]) => {
        this.studentList = students;
      }).catch(
        (error: ErrorHandler) => {
          this.toastService.showToast()
        }
      );
  }

  addStudents(): void {
    this.modalService.openLargeModal(AddStudenToCourseFormComponent)
  }
}
