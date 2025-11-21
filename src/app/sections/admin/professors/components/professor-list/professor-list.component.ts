import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';
import { ToastService } from '../../../../../shared/services/toast.service';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { firstValueFrom } from 'rxjs';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';
import { User } from '../../../users/model/user.model';
import { GenericStore } from '../../../../../shared/store/generic-crud.store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpErrorResponse } from '@angular/common/http';
import { UserEnum } from '../../../users/enums/user-type.enum';
import { UserService } from '../../../../../shared/services/user/user.service';


@Component({
    selector: 'app-professor-list',
    standalone: true,
    imports: [CommonModule, InfiniteScrollModule],
    templateUrl: './professor-list.component.html',
    styleUrl: './professor-list.component.scss'
})
export class ProfessorListComponent {
  title: string = 'Docentes';
  path: string = '/admin/professors';
  professors: User[] = [];
  isLoanding: boolean = false;

  constructor(
    private router: Router,
    private swalService: SwalService,
    private toastService: ToastService,
    private userService: UserService<User>,
    public store: GenericStore<User>
  ) { }

  ngOnInit() {
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
        rol: UserEnum.PROFESSOR,
        page: paginationMeta.currentPage,
        limit: paginationMeta.itemsForPage,
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

  private async deleteProfessor(professorId: string): Promise<void> {
    await firstValueFrom(this.userService.delete(professorId))
    .then(() => {
      this.toastService.showToast(`Docente eliminado`, ``, AlertType.SUCCESS);
      this.ngOnInit();
    }).catch((error: ErrorHandler) => {
      this.toastService.showHttpError(error);
    }); 
  }

  addProfessor(): void {
    this.router.navigate([this.path, 'create'])
  }

  openProfessorEdit(professorId: string) {
    const editPath: string = `${this.path}/edit`;
    this.router.navigate([editPath, professorId]);
  }

  viewDetail(professorId: string): void {
    const editPath: string = `${this.path}/detail`;
    this.router.navigate([editPath, professorId]);
  }

  async openDeleteModal(professor: User): Promise<void> {
    const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el docente ${professor.firstName} ${professor.secondName}?`, '');
    if (confirmationResponse === SwalAlertResponse.CONFIRM) {
      this.deleteProfessor(professor.id);
    }
  }
}
