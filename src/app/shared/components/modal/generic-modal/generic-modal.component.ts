import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-generic-modal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './generic-modal.component.html',
	styleUrl: './generic-modal.component.scss'
})
export class GenericModalComponent {
	@Output() closeModalEvent = new EventEmitter();
	@Input() isHiddenCloseButton: boolean = false; 
	
	closeModal():void {
		this.closeModalEvent.emit();
	}
}
