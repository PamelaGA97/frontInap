import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Secretary } from '../../models/secretary.model';
import { TurnsJob } from '../../../../../shared/enums/turns-job.enum';
import { Branch } from '../../../../../shared/enums/branch.enum';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { CommonModule } from '@angular/common';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';

@Component({
  selector: 'app-secretary-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './secretary-list.component.html',
  styleUrl: './secretary-list.component.scss'
})
export class SecretaryListComponent {
  title: string ='Secretarias';
  path: string = '/admin/secretaries';

  secretaries: Secretary[] = [
    {
      id: 'lkamsdflkas;dflkasd',
      turn: TurnsJob.MORNING,
      branch: Branch.BRANCH_JORDAN,
      user: {
        rol: UserRolEnum.SECRETARY,
        firstName: 'Andrea',
        secondName: 'Lopez',
        ci: '98127391',
        cellphone: 77954876
      }
    },
    {
      id: 'oasjdlc/jkxklm',
      turn: TurnsJob.MORNING,
      branch: Branch.BRANCH_JORDAN,
      user: {
        rol: UserRolEnum.SECRETARY,
        firstName: 'carlos',
        secondName: 'maldonado',
        ci: '98123391',
        cellphone: 77004876
      }
    }
  ];

  constructor(
    private router: Router,
    private swalService: SwalService
  ) {}

  addSecretary() {
    this.router.navigate([this.path, 'create'])
  }

  openSecretaryEdit(secretaryId: string): void {
    console.log('vamos a editar la secretaria')
  }

  async deleteSecretary(secretary: Secretary): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar la secretaria ${secretary.user.firstName} ${secretary.user.secondName}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
			console.log('Eliminar el usuario')
		}
	}
}
