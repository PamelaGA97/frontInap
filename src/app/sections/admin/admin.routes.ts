import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { Component } from '@angular/core';
import { StudentsComponent } from './students/students.component';

export const ADMIN_ROUTES: Routes = [
	{
		path: '',
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
			},
			{
				path: 'students',
				component: StudentsComponent,
				loadChildren: () => import('./students/routes').then(mod => mod.STUDENT_ROUTES)
			}
		]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard'
	}
];
