import { Component } from '@angular/core';
import { Faculty } from '../../models/faculty.model';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FacultyService } from '../../services/facuties.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { FacultyFormComponent } from "../../forms/faculty-form/faculty-form.component";

@Component({
  selector: 'app-faculty-detail',
  standalone: true,
  imports: [FacultyFormComponent],
  templateUrl: './faculty-detail.component.html',
  styleUrl: './faculty-detail.component.scss'
})
export class FacultyDetailComponent {
  facultyId!: string;
  faculty?: Faculty;
  preview: boolean = true;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private facultyService: FacultyService
  ) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.getFacultyId();
    await this.loadFacultyData();
  }

  private getFacultyId(): void {
    this.facultyId = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  private async loadFacultyData(): Promise<void> {
    await firstValueFrom(this.facultyService.get(this.facultyId))
      .then((faculty: Faculty) => {
        this.faculty = faculty;
      })
      .catch((error: ErrorHandler) => {
        this.toastService.showHttpError(error);
      });
  }
  
  backToFacultyList(): void {
    this.location.back()
  }
}
