import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { InscriptionFormComponent } from "../../forms/inscription-form/inscription-form.component";

@Component({
  selector: 'app-inscription-create',
  standalone: true,
  imports: [InscriptionFormComponent],
  templateUrl: './inscription-create.component.html',
  styleUrl: './inscription-create.component.scss'
})
export class InscriptionCreateComponent {

  constructor(
    private location: Location,
  ) {}

  createInscription(): void {
    console.log('Inscripcion creada')
  }

  backToInscriptionList(): void {
    this.location.back();
  }
}
