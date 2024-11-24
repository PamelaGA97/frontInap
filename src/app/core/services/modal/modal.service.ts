import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
	providedIn: 'root'
})
export class ModalService {
	private ngbModal = inject(NgbModal);

	constructor() { }

	async open(component?: any): Promise<any> {
		return await this.ngbModal.open(component).result;
	}

	async openLargeModal(component?: any): Promise<any> {
		const options = {
			size: 'lg'
		}
		return await this.ngbModal.open(component, options).result;
	}
}
