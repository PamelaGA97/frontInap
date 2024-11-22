import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../models/login.model';
import { FormStatus } from '../../../../shared/enums/form-status.enum';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';

@Component({
	selector: 'app-login-form',
	standalone: true,
	imports: [ReactiveFormsModule, AlertComponent],
	templateUrl: './login-form.component.html',
	styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
	@Output() submitFormEvent = new EventEmitter<Login>();
	public loginForm!: FormGroup;
	public formStatusEnum = FormStatus;
	public isSubmit: boolean = false;

	constructor(
		private formBuilder: FormBuilder
	) {
		this.initialize();
	}

	private initialize(): void {
		this.initializeForm();
	}

	private initializeForm(): void {
		this.loginForm = this.formBuilder.group({
			user: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		})
	}

	submit(): void {
		this.isSubmit = true;
		if (this.loginForm.valid) {
			this.submitFormEvent.emit(this.loginForm.value);
		}
	}

	get userControl() {
		return this.loginForm.controls['user'];
	}

	get passwordControl() {
		return this.loginForm.controls['password'];
	}
}
