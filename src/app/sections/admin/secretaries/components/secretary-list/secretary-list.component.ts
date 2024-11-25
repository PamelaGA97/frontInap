import { Component } from '@angular/core';

@Component({
  selector: 'app-secretary-list',
  standalone: true,
  imports: [],
  templateUrl: './secretary-list.component.html',
  styleUrl: './secretary-list.component.scss'
})
export class SecretaryListComponent {
  title: string ='Secretarias';

  constructor() {}

  addSecretary() {}
}
