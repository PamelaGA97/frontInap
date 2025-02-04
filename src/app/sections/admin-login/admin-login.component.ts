import { Component, ViewChild } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { Login } from './models/login.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-login',
	standalone: true,
	imports: [LoginFormComponent],
	templateUrl: './admin-login.component.html',
	styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
	@ViewChild('loginFormComponent') loginFormComponent?: LoginFormComponent;
	isDisableButton: boolean = false;
	inaptImagePath: string = 'assets/image/inap.jpg';
	path: string = '/admin';

	constructor(
		private router: Router
	) {}

	public submitLoginForm(loginForm: Login): void {
		this.isDisableButton = false;
		console.log('Se envia la peticion al backend usando el servicio de auth', loginForm)
	}

	public onSubmit(): void {
		this.isDisableButton = true;
		this.loginFormComponent?.submit();
		this.router.navigate([this.path])
	}
}
