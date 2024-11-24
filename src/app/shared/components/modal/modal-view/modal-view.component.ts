import { Component, Input, inject } from '@angular/core';
import { GenericModalComponent } from '../generic-modal/generic-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-modal-view',
	standalone: true,
	imports: [GenericModalComponent],
	templateUrl: './modal-view.component.html',
	styleUrl: './modal-view.component.scss'
})
export class ModalViewComponent {
	@Input() isHiddenCloseButton: boolean = true;
	private modalActive = inject(NgbActiveModal)

	closeModal(): void {
		this.modalActive.close();
	}
}
