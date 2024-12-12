import { Location } from '@angular/common';
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

@Component({
  selector: 'app-faculty-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './faculty-course-detail.component.html',
  styleUrl: './faculty-course-detail.component.scss'
})
export class FacultyCourseDetailComponent {
  facultyCourseId?: string;
  facultyCourse?: FacultyCourse;
  studentList?: Student[] = [];
  paymentStatus = PaymentStatus;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private facultyCoursesStorageService: FacultyCoursesStorageService,
    private studentService: StudentService,
    private toastService: ToastService
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
    this.facultyCourse = this.facultyCoursesStorageService.getItem(this.facultyCourseId  || '');
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
    // abrir modal
    
  }
}
