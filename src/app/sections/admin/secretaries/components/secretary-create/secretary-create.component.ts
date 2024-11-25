import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { SecretaryFormComponent } from "../../forms/secretary-form/secretary-form.component";
import { Secretary } from '../../models/secretary.model';
import { Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';

@Component({
  selector: 'app-secretary-create',
  standalone: true,
  imports: [SecretaryFormComponent],
  templateUrl: './secretary-create.component.html',
  styleUrl: './secretary-create.component.scss'
})
export class SecretaryCreateComponent {
  @ViewChild('secretaryForm') secretaryFormComponent!: SecretaryFormComponent

  constructor(
    private location: Location,
    private router: Router
  ) {}

  backToSecretaryList(): void {
    this.location.back();
  }

  createSecretary(): void {
    this.secretaryFormComponent.submit();
  }

  saveSecretary(secretary: Secretary): void {
    console.log('Realizar la conexion a base de datos', secretary);
    this.router.navigate([adminPath, 'secretaries'])
  }
}
