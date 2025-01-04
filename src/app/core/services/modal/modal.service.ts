// import { Injectable, inject } from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// @Injectable({
// 	providedIn: 'root'
// })
// export class ModalService {
// 	private ngbModal = inject(NgbModal);

// 	constructor() { }

// 	async open(component?: any): Promise<any> {
// 		return await this.ngbModal.open(component).result;
// 	}

// 	async openLargeModal(component?: any): Promise<any> {
// 		const options = {
// 			size: 'lg'
// 		}
// 		return await this.ngbModal.open(component, options).result;
// 	}
// }

import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRef: NgbModalRef | null = null;

  constructor(private modalService: NgbModal) {}

  open<T>(content: any, options?: any): Promise<T> {
    this.modalRef = this.modalService.open(content, options);
    return this.modalRef.result as Promise<T>; // Devuelve la promesa con los datos
  }

  close(data?: any): void {
    if (this.modalRef) {
      this.modalRef.close(data);
      this.modalRef = null;
    }
  }

  dismiss(reason?: any): void {
    if (this.modalRef) {
      this.modalRef.dismiss(reason);
      this.modalRef = null;
    }
  }
}