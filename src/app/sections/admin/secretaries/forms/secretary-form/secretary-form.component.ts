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
import { matchValidator } from '../../../../../shared/validations/validation-password';
import { phoneNumberValidator } from '../../../../../shared/validations/phone-validation';

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
      firstName: ['', [Validators.required]],
      secondName: ['', [Validators.required]],
      ci: ['', [Validators.required]],
      phone: ['', [Validators.required, phoneNumberValidator()]],
      rol: [UserRolEnum.SECRETARY, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      isAvaible: [true, [Validators.required]],
      turn: ['', [Validators.required]],
    },
    { validators: matchValidator('password', 'confirmPassword') });
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
    this.secretaryForm.markAllAsTouched();
    if (this.secretaryForm.valid) {
      const secretaryDatas = { ...this.secretaryData, ...this.secretaryForm.value };
      this.submitFormEvent.emit(secretaryDatas);
    }
  }

  get firstName() {
    return this.secretaryForm?.controls['firstName'];
  }

	get secondName() {
		return this.secretaryForm?.controls['secondName'];
	}

  get ci() {
		return this.secretaryForm?.controls['ci'];
	}

  get phone() {
		return this.secretaryForm?.controls['phone'];
	}

  get turn() {
    return this.secretaryForm?.controls['turn'];
  }

  get branch() {
    return this.secretaryForm?.controls['branch'];
  }

  get salary() {
    return this.secretaryForm?.controls['salary']
  }

  get email() {
    return this.secretaryForm?.controls['email']
  }

  get password() {
    return this.secretaryForm?.controls['password']
  }

  get confirmPassword() {
    return this.secretaryForm.controls['confirmPassword']
  }
}
