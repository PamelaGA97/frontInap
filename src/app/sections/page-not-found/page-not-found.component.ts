import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-page-not-found',
	standalone: true,
	imports: [],
	templateUrl: './page-not-found.component.html',
	styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
	pageNotFoundPath: string = 'assets/image/404-ill.jpg'

	constructor(
		private location: Location
	) {}

	backPage(): void {
		this.location.back();
	}
}
