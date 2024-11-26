import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { Component } from '@angular/core';
import { StudentsComponent } from './students/students.component';
import { SecretariesComponent } from './secretaries/secretaries.component';
import { ProfessorsComponent } from './professors/professors.component';

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
			},
			{
				path: 'secretaries',
				component: SecretariesComponent,
				loadChildren: () => import('./secretaries/routes').then(mod => mod.SECRETARY_ROUTES)
			},
			{
				path: 'professors',
				component: ProfessorsComponent,
				loadChildren: () => import('./professors/routes').then(mod => mod.PROFESSOR_ROUTES)
			}
		]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard'
	}
];
