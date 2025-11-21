import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Faculty } from '../../models/faculty.model';
import { firstValueFrom } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { FacultyService } from '../../services/facuties.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';
import { GenericStore } from '../../../../../shared/store/generic-crud.store';

@Component({
    selector: 'app-faculty-list',
    standalone: true,
    imports: [CommonModule, InfiniteScrollModule],
    templateUrl: './faculty-list.component.html',
    styleUrl: './faculty-list.component.scss'
})
export class FacultyListComponent {
  title: string = 'Facultad';
  path: string =  '/admin/faculties';
  faculties: Faculty[] = [];
  isLoanding: boolean = false;

  constructor(
    private router: Router,
    private swalService: SwalService,
    private facultyService: FacultyService,
    private toastService: ToastService,
    public store: GenericStore<Faculty>
  ) {
  }
  ngOnInit(): void {
    this.store.clear();
    this.initialize();
  }

  addFaculty(): void {
    this.router.navigate([this.path, 'create'])
  }

  openFacultyEdit(facultyId: string): void {
    const editPath = `${this.path}/edit`;
    this.router.navigate([editPath, facultyId]);
  }

  async openDeleteFaculty(faculty: Faculty): Promise<void> {
		const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar la facultad de ${faculty.name}.`, '');
		if (confirmationResponse === SwalAlertResponse.CONFIRM) {
      this.deleteFaculty(faculty.id);
		}
	}

  viewDetail(facultyId: string): void {
    const detailPath = `${this.path}/detail`;
    this.router.navigate([detailPath, facultyId]);
  }

  private initialize(): void {
    this.loadNextPage();
  }

  loadNextPage(): void {
    if (this.isLoanding) return;
      const paginationMeta = this.store.pagination();
    if (!paginationMeta.hasMore) return;

    firstValueFrom(this.facultyService.getAll(
      {
        page: paginationMeta.currentPage,
        limit: paginationMeta.itemsForPage
      }
    )).then((response: PaginationResponse<Faculty>) => {
        response.meta.currentPage = response.meta.currentPage + 1;
        this.store.addEntities(response.data, response.meta);
        this.store.addPaginationDetail(response.meta);
        this.isLoanding = false;
      }).catch((error: Partial<HttpErrorResponse>) => {
        this.toastService.showHttpError(error.error);
  			this.isLoanding = false;
      });
  }

  private async deleteFaculty(facultyId: string): Promise<void> {
    await firstValueFrom(this.facultyService.delete(facultyId))
    .then(() => {
      this.toastService.showToast(`La facultad fue eliminada`, ``, AlertType.SUCCESS);
      this.ngOnInit();
    }).catch((error: ErrorHandler) => {
      this.toastService.showHttpError(error);
    });
  }
}
