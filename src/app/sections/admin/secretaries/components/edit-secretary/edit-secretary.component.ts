import { Component, ViewChild } from '@angular/core';
import { SecretaryFormComponent } from '../../forms/secretary-form/secretary-form.component';
import { SecretaryService } from '../../services/secretary.service';
import { CommonModule, Location } from '@angular/common';
import { Secretary } from '../../models/secretary.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { adminPath } from '../../../../../core/admin-url-path';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-secretary',
  standalone: true,
  imports: [SecretaryFormComponent, CommonModule],
  templateUrl: './edit-secretary.component.html',
  styleUrl: './edit-secretary.component.scss'
})
export class EditSecretaryComponent {
  @ViewChild('secretaryForm') secretaryFormComponent!: SecretaryFormComponent
  secretary?: Secretary;
  resourseId!: string;

  constructor (
    private secretaryService: SecretaryService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    this.loadId();
    console.log(1)
    await this.loadSecretary();
    console.log(3)
  }

  private loadId(): void {
    this.resourseId = this.route.snapshot.paramMap.get('id') || '';
  }

  private async loadSecretary(): Promise<void> {
    await firstValueFrom(this.secretaryService.get(this.resourseId))
      .then((response: Secretary) => {
        this.secretary = response;
        console.log(this.secretary)
      }).catch(
        (error) => {
          console.log(error)
        })
    console.log(2)

  }
/*
  private async loadSecretary(): Promise<void> {
    this.secretaryService.get(this.resourseId).subscribe(
      (response)=> {
        this.secretary = response;
        console.log(this.secretary)
    })
  }*/

  backToSecretaryList(): void {
    this.location.back();
  }

  editarSecretary(): void {
    this.secretaryFormComponent.submit();
  }

  saveSecretary(secretary: Secretary): void {
    this.secretaryService.patch(secretary.id, secretary).subscribe(
      (response) => {
        console.log('creado')
        this.router.navigate([adminPath, 'secretaries'])
      }, (error: ErrorHandler) => {
        console.log(error)
      }
    );
  }
}
