import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FacultyService } from '../../services/facuties.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Faculty } from '../../models/faculty.model';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { FacultyFormComponent } from '../../forms/faculty-form/faculty-form.component';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { adminPath } from '../../../../../core/admin-url-path';

@Component({
  selector: 'app-faculty-edit',
  standalone: true,
  imports: [FacultyFormComponent],
  templateUrl: './faculty-edit.component.html',
  styleUrl: './faculty-edit.component.scss'
})
export class FacultyEditComponent {
  @ViewChild('facultyForm') FacultyFormComponent!: FacultyFormComponent;
  secretaryId!: string;
  faculty?: Faculty;
  pageName: string = 'faculties';
  toastSuccessMessage: string = 'Facultad actualizada';

  constructor(
    private location: Location,
    private facultyService: FacultyService,
    private activateRoute: ActivatedRoute,
    private toastService: ToastService,
    private router: Router
  ) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.getFacultyId();
    await this.getFacultyData();
  }

  private getFacultyId(): void {
    this.secretaryId = this.activateRoute.snapshot.paramMap.get('id') || '';
  }

  private async getFacultyData(): Promise<void> {
    await firstValueFrom(this.facultyService.get(this.secretaryId))
      .then((response: Faculty) => {this.faculty = response;})
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }

  editFaculty(): void {
    this.FacultyFormComponent.submit();
  }

  async saveFaculty(faculty: Faculty): Promise<void> {
    await firstValueFrom(this.facultyService.patch(faculty.id, faculty))
      .then(
        (response: Faculty) => {
          this.toastService.showToast(this.toastSuccessMessage, ``, AlertType.SUCCESS);
          this.router.navigate([adminPath, this.pageName]);
        }
      ).catch(
        (error: ErrorHandler) => {
          this.toastService.showHttpError(error);
        });
  }

  backToFacultyList(): void {
    this.location.back();
  }
}
