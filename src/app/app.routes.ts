import { Routes } from '@angular/router';
import { AdminLoginComponent } from './sections/admin-login/admin-login.component';
import { PageNotFoundComponent } from './sections/page-not-found/page-not-found.component';
import { AdminComponent } from './sections/admin/admin.component';
import { HomeComponent } from './sections/admin/home/home.component';
import { UsersComponent } from './sections/admin/users/users.component';

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
	{
		path: 'admin',
		loadChildren: () => import('./sections/admin/admin.routes').then(mod => mod.ADMIN_ROUTES)
	},
	{
		path: '**',
		pathMatch: 'full',
		component: PageNotFoundComponent
	}
];
