import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { CommonModule } from '@angular/common';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { TurnsJob } from '../../../../../shared/enums/turns-job.enum';
import { Branch } from '../../../../../shared/enums/branch.enum';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { Secretary } from '../../models/secretary.model';

@Component({
  selector: 'app-secretary-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BlockInvalidNumberKeysDirective],
  templateUrl: './secretary-form.component.html',
  styleUrl: './secretary-form.component.scss'
})
export class SecretaryFormComponent {
  @Input() secretaryData?: Secretary;
  @Input() isPreview: boolean = false; 
  @Output() submitFormEvent = new EventEmitter<Secretary>();
  secretaryForm!: FormGroup;
  validationErrorMessage = ValidatioErrorMessage;
  formStatusEnum = FormStatus;
  turns = Object.values(TurnsJob);
  branches = Object.values(Branch);

  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.initialize()
  }
  
  ngOnInit(): void {
    this.addSecretaryDataToForm();
  }
  
  private initialize(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.secretaryForm = this._formBuilder.group({
      turn: ['', Validators.required],
      branch: ['', Validators.required],
      user: this._formBuilder.group({
        firstName: ['', [Validators.required]],
        secondName: ['', [Validators.required]],
        rol: [UserRolEnum.SECRETARY, [Validators.required]],
        ci: ['', [Validators.required]],
        cellphone: ['', [Validators.required]],
      })
    });
  }
  
  private addSecretaryDataToForm(): void {
    if (this.secretaryData) {
      this.secretaryForm.patchValue(this.secretaryData);
    }
  }

  onTurnChange(turn: any): void {
    const value = turn.target.value as TurnsJob;
    this.secretaryForm.controls['turn'].setValue(value)
  }

  onBranchChange(branch: any): void {
    const value = branch.target.value as TurnsJob;
    this.secretaryForm.controls['branch'].setValue(value)
  }

  submit(): void {
    if (this.secretaryForm.valid) {
      const secretaryDatas = { ...this.secretaryData, ...this.secretaryForm.value };
      this.submitFormEvent.emit(secretaryDatas);
    }
  }

  get firstName() {
    return this.secretaryForm?.controls['user'].get('firstName');
  }

	get secondName() {
		return this.secretaryForm?.controls['user'].get('secondName');
	}

  get ci() {
		return this.secretaryForm?.controls['user'].get('ci');
	}

  get cellphone() {
		return this.secretaryForm?.controls['user'].get('cellphone');
	}

  get turn() {
    return this.secretaryForm?.controls['turn'];
  }

  get branch() {
    return this.secretaryForm?.controls['branch'];
  }
}
