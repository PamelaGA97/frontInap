import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';

export const ADMIN_ROUTES: Routes = [
	{
		path: 'dashboard',
		component: AdminComponent,
		children: [
			{
				path: '',
				component: HomeComponent
			},
			{
				path: 'users',
				component: UsersComponent,
				loadChildren: () => import('./users/routes').then(mod=> mod.USERS_ROUTES)
			}
		]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard'
	}
];
