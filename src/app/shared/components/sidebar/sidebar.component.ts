import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ViewPage } from '../../models/view-page.model';
import { pages } from '../../../core/admin-url-path';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
	@Input() viewPages: ViewPage[];
	@Input() currentView: string;

	constructor() {
		this.viewPages = pages;
		this.currentView = '';
		this.initialize();
	}

	private initialize(): void {
		this.loadCurrentPage();
	}

	private loadCurrentPage(): void {

	};

	public onClick(pageName: string): void {
		this.currentView = pageName;
	}
}
