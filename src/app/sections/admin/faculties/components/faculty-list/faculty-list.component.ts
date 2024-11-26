import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Faculty } from '../../models/faculty.model';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';

@Component({
  selector: 'app-faculty-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty-list.component.html',
  styleUrl: './faculty-list.component.scss'
})
export class FacultyListComponent {
  title: string = 'Facultad';
  path: string =  '/admin/faculties';
  faculties: Faculty[] = [
    {
      id: 'kjlasdjf;asldkfl',
      name: 'Tecnologia'
    },
    {
      id: 'kjlasdjf;asldkfl',
      name: 'Humanidades'
    },
    {
      id: 'kjlasdjf;asldkfl',
      name: 'Derecho'
    }
  ]

  constructor(
    private router: Router,
    private swalService: SwalService
  ) {}

  addFaculty(): void {
    this.router.navigate([this.path, 'create'])
  }

  openFacultyEdit(facultyId: string): void {

  }

  async deleteFaculty(faculty: Faculty): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar la facultad de ${faculty.name}.`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
			console.log('Eliminar la facultad')
		}
	}
}
