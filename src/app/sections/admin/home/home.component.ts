import { Component } from '@angular/core';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { ProfessorService } from '../professors/services/professors.service';
import { Professor } from '../professors/models/professor.model';
import { firstValueFrom } from 'rxjs';
import { ErrorHandler } from '../../../shared/models/errorHandler.model';
import { ToastService } from '../../../shared/services/toast.service';
import { StudentService } from '../students/services/student.service';
import { Student } from '../students/models/student.model';
import { FacultyCourseService } from '../faculty-courses/services/faculty-course.service';
import { FacultyCourse } from '../faculty-courses/models/faculty-course.model';
import { StudentFacultyCount } from './model/student-faculty-count.model';
import { Faculty } from '../faculties/models/faculty.model';
import { FacultyService } from '../faculties/services/facuties.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  professorsList: Professor[] = [];
  studentList: Student[] = [];
  facultyList: Faculty[] = [];
  facultyCourseList: FacultyCourse[] = [];
  studentForFacultyDetailList: StudentFacultyCount[] = [];

  constructor(
    private professorService: ProfessorService,
    private toastService: ToastService,
    private facultyService: FacultyService,
    private studentService: StudentService,
    private facultyCoursesService: FacultyCourseService
  ) {

  }

  async ngOnInit(): Promise<void> {
    await this.loadProfessors();
    await this.loadStudents();
    await this.loadFaculties();
    await this.loadfacultyCourses();
    await this.loadStudentForFaculty();
  }

  private async loadProfessors(): Promise<void> {
    firstValueFrom(this.professorService.getAll()).then(
      (professors: Professor[]) => {
        this.professorsList = professors;
      }
    ).catch(
      (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      }
    );
  }

  private async loadStudents(): Promise<void> {
    await firstValueFrom(this.studentService.getAll()).then(
      (students: Student[]) => {
        this.studentList = students;
      }
    ).catch(
      (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      }
    )
  }

  private async loadFaculties(): Promise<void> {
    await firstValueFrom(this.facultyService.getAll()).then(
      (faculties: Faculty[]) => {
        this.facultyList = faculties;
      }
    ).catch(
      (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      }
    )
  }

  private async loadfacultyCourses(): Promise<void> {
    await firstValueFrom(this.facultyCoursesService.getAll()).then(
      (facultyCourses: FacultyCourse[]) => {
        this.facultyCourseList = facultyCourses;
      }
    ).catch(
      (error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      }
    )
  }

  private async loadStudentForFaculty(): Promise<void> {
    await firstValueFrom(this.studentService.studentForFaculty()).then(
      (response) => {
        this.studentForFacultyDetailList = response.data
      }
    )
  }

  searchStudentForFaculty(faculty: Faculty): number {
    const facultyFounded = this.studentForFacultyDetailList.find(
      (element: StudentFacultyCount) => element.faculty === faculty.id
    );
    return facultyFounded ? facultyFounded.count : 0;
  }
}
