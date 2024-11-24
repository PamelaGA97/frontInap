import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { urlImagesPath } from '../../core/img-path-url';

@Component({
	selector: 'app-admin',
	standalone: true,
	imports: [RouterOutlet, HomeComponent, SidebarComponent, HeaderComponent],
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss'
})
export class AdminComponent {
	urlLogo: string = urlImagesPath.inap;

	constructor() {
	}
}
