import { Routes } from '@angular/router';
import { AdminLoginComponent } from './sections/admin-login/admin-login.component';

export const routes: Routes = [
    {
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
	},
	{
		path: 'login',
		component: AdminLoginComponent
	},
];
