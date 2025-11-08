import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { CommonModule } from '@angular/common';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { YearPipe } from '../../../../../core/pipes/year.pipe';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { UserService } from '../../../../../shared/services/user/user.service';
import { User } from '../../../users/model/user.model';
import { GenericStore } from '../../../../../shared/store/generic-crud.store';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';
import { firstValueFrom } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
    selector: 'app-student-list',
    standalone: true,
    imports: [CommonModule, YearPipe, InfiniteScrollModule],
    templateUrl: './student-list.component.html',
    styleUrl: './student-list.component.scss'
})

export class StudentListComponent {
  title: string = 'Estudiantes';
  path: string = '/admin/students';
  students: User[] = [];
  isLoanding: boolean = false;

  constructor(
    private router: Router,
    private swalService: SwalService,
    private toastService: ToastService,
    private userService: UserService<User>,
    public store: GenericStore<User>
  ) {}
  
  ngOnInit(): void {
    this.store.clear();
    this.initialize();
  }
  
  private initialize(): void {
    this.loadNextPage();
  }

  loadNextPage(): void {
    if (this.isLoanding) return;
		const paginationMeta = this.store.pagination();
		if (!paginationMeta.hasMore) return;

    firstValueFrom(this.userService.getAll(
			{
				rol: UserRolEnum.STUDENT,
				page: paginationMeta.currentPage,
				limit: paginationMeta.itemsForPage
			}
		)).then((response: PaginationResponse<User>) => {
			response.meta.currentPage = response.meta.currentPage + 1;
			this.store.addEntities(response.data, response.meta);
			this.store.addPaginationDetail(response.meta);
			this.isLoanding = false;
		})
		.catch((error: Partial<HttpErrorResponse>) => {
			this.toastService.showHttpError(error.error);
			this.isLoanding = false;
		});
  }

  private async deleteStudent(studentId: string): Promise<void> {
    await firstValueFrom(this.userService.delete(studentId))
    .then(() => {
      this.toastService.showToast(`Estudiante eliminado`, ``, AlertType.SUCCESS)
      this.ngOnInit();
    }).catch((error: Partial<HttpErrorResponse>) => {
      this.toastService.showHttpError(error.error);
    });
  }

  addStudent(): void {
    this.router.navigate([this.path, 'create']);
  }

  editStudent(studentId: string): void {
    const editPath = `${this.path}/edit`;
    this.router.navigate([editPath, studentId]);
  }

  viewDetail(studentId: string): void {
    const detailPath = `${this.path}/detail`;
    this.router.navigate([detailPath, studentId]);
  }
  
  async openDeleteModal(student: User): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el estudiante ${student.firstName} ${student.secondName}?`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
      this.deleteStudent(student.id);
		}
	}
}
