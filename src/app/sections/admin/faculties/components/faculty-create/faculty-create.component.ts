import { Component, ViewChild } from '@angular/core';
import { FacultyFormComponent } from '../../forms/faculty-form/faculty-form.component';
import { Faculty } from '../../models/faculty.model';
import { Location } from '@angular/common';
import { FacultyService } from '../../services/facuties.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-faculty-create',
  standalone: true,
  imports: [
    FacultyFormComponent,
    ToastrModule,
  ],
  templateUrl: './faculty-create.component.html',
  styleUrl: './faculty-create.component.scss'
})
export class FacultyCreateComponent {
  @ViewChild('facultyForm') facultyFormComponent!: FacultyFormComponent;
  path: string = 'admin/faculties';
  constructor (
    private location: Location,
    private facultyServices: FacultyService,
    private router: Router,
		private toastService: ToastService,

  ) {}

  createfaculty(): void {
    this.facultyFormComponent.submit();
  }

  backTofacultyList(): void {
    this.location.back();
  }

  saveFaculty(faculty: Faculty): void {
    this.facultyServices.create(faculty).subscribe(
      (response) => {
        this.toastService.showToast('Facultad creada correctamente', '', AlertType.SUCCESS);
        this.router.navigate([this.path])
      });
  }
}
