import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRolEnum } from '../../../../../shared/enums/user-rol.enum';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { ToastService } from '../../../../../shared/services/toast.service';
import { AlertType } from '../../../../../shared/services/alert.enum';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
import { SwalAlertResponse } from '../../../../../core/services/swal-alert/swal-alert-response.enum';
import { SwalService } from '../../../../../core/services/swal-alert/swal.service';

@Component({
	selector: 'app-user-form',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
	@Output() submitFormEvent = new EventEmitter<any>();
	userForm!: FormGroup;
	userRolsEnum = Object.values(UserRolEnum);
	isSubmit: boolean = false;
	formStatusEnum = FormStatus;
	validationErrorMessage = ValidatioErrorMessage;

	constructor(
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		private swalService: SwalService
	) {
		this.initializeForm();
	}

	isInvalidForm(): boolean {
		let isInvalidForm = false;
		if (this.password.value !== this.rePassword.value) {
			this.swalService.openAlertModal(this.validationErrorMessage.equalsPassword, '');
			isInvalidForm = true;
		}
		return isInvalidForm;
	}

	initializeForm(): void {
		this.userForm = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			secondName: ['', [Validators.required]],
			password: ['', [Validators.required]],
			rePassword: ['', [Validators.required]],
			rol: ['', [Validators.required]]
		});
	}

	submit(): void {
		this.isInvalidForm();
		if(this.isSubmit && this.userForm.valid && !this.isInvalidForm()) {
			this.submitFormEvent.emit(this.userForm.value);
		}
	}

	get firsName() {
		return this.userForm.controls['firstName'];
	}

	get secondName() {
		return this.userForm.controls['secondName'];
	}

	get password() {
		return this.userForm.controls['password'];
	}

	get rePassword() {
		return this.userForm.controls['rePassword'];
	}

	get rol() {
		return this.userForm.controls['rol'];
	}
}
