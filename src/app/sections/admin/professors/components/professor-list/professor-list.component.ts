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
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/model/user.model';
import { GenericStore } from '../../../../../shared/store/generic-crud.store';
import { InfiniteScrollDirective, InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpErrorResponse } from '@angular/common/http';
import { UserEnum } from '../../../users/enums/user-type.enum';


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
  //hasMore: boolean = true;
  isLoanding: boolean = false;
  currentPage: number = 1;

  constructor(
    private router: Router,
    private swalService: SwalService,
    private toastService: ToastService,
    private userService: UserService,
    public store: GenericStore<User>
  ) { }

  ngOnInit() {
    this.initialize();
  }

  private initialize(): void {
    this.store.clear();
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

  // private getAllProfessors(): void {
  //   firstValueFrom(this.userService.getAll())
  //     .then((response: PaginationResponse<User>) => {
  //       this.professors = response.data;
  //     }).catch((error: ErrorHandler) => {
  //       this.toastService.showHttpError(error);
  //     });
  // }

    // private deleteProfessor(professorId: string): void {
    //   firstValueFrom(this.professorService.delete(professorId))
    //   .then((response: any) => {
    //     this.toastService.showToast(`Docente eliminado`, ``, AlertType.SUCCESS);
    //     this.getAllProfessors();  
    //   }).catch((error: ErrorHandler) => {
    //     this.toastService.showHttpError(error);
    //   }); 
    // }

    addProfessor(): void {
      this.router.navigate([this.path, 'create'])
    }

    // openProfessorEdit(professorId: string) {
    //   const editPath: string = `${this.path}/edit`;
    //   this.router.navigate([editPath, professorId]);
    // }

    // viewDetail(professorId: string): void {
    //   const editPath: string = `${this.path}/detail`;
    //   this.router.navigate([editPath, professorId]);
    // }

    // async openDeleteModal(professor: Professor): Promise<void> {
    // 	const confirmationResponse = await this.swalService.openConfirmationModal(`¿Estas seguro de eliminar el docente ${professor.user.firstName} ${professor.user.secondName}?`, '');
    // 	if (confirmationResponse === SwalAlertResponse.CONFIRM) {
    //     this.deleteProfessor(professor.id);
    // 	}
    // }
}
