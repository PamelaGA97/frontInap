import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
import { SwalAlertResponse } from './swal-alert-response.enum';

@Injectable({
	providedIn: 'root'
})
export class SwalService {
	private _defauldconfirmationTitle: string = '¿Estas seguro que quieres continuar?';
	private _defauldText: string = '';
	private _defauldIcon: SweetAlertIcon = 'warning';
	private _confirmButtonColor: string = '#0052cc';
	private _confirmButtonText: string = 'Confirmar';
	private _cancelButtonColor: string = '#fa3b1d';
	private _cancelButtonText: string = 'Cancelar';
	constructor() { }

	private getSwalConfig(title: string, text: string, showCancelButton?: boolean, confirmButtonText?: string): SweetAlertOptions {
		return {
			title: title ? title : this._defauldconfirmationTitle,
			text: text ? text : this._defauldText,
			icon: this._defauldIcon,
			showCancelButton: showCancelButton ?? false, 
			confirmButtonText: confirmButtonText ?? this._confirmButtonText,
			cancelButtonText: this._cancelButtonText,
			confirmButtonColor: this._confirmButtonColor,
			cancelButtonColor: this._cancelButtonColor
		}
	}

	async openConfirmationModal(title: string, text: string): Promise<SwalAlertResponse> {
		let res: SwalAlertResponse = SwalAlertResponse.CANCEL;
		const config = this.getSwalConfig(title, text, true);
		await Swal.fire(config)
 			.then((response: SweetAlertResult) => {
				if (response.isConfirmed) {
					res = SwalAlertResponse.CONFIRM;
				}
				if (response.isDismissed && response.dismiss === Swal.DismissReason.backdrop) {
					res = SwalAlertResponse.BACKDROP;
				}
			})
		return res;
	}

	async openAlertModal(title: string, text: string):Promise<any> {
		const config = this.getSwalConfig(title, text, false, 'Aceptar');
		await Swal.fire(config)
			.then((response) => {
				console.log(response);
			});
	}
}
