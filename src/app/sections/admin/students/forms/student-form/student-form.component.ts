import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Subject } from 'rxjs';
import { UserRolEnum } from '../../../users/enums/user-rol.enum';
import { BlockInvalidNumberKeysDirective } from '../../../../../core/directives/block-invalid-number-keys.directive';
import { FormStatus } from '../../../../../shared/enums/form-status.enum';
import { ValidatioErrorMessage } from '../../../../../core/validation-error-message';
import { FacultyService } from '../../../faculties/services/facuties.service';
import { Faculty } from '../../../faculties/models/faculty.model';
import { matchValidator } from '../../../../../shared/validations/validation-password';
import { User } from '../../../users/model/user.model';
import { generateYearList, parseDateYearToNumber } from '../../../../../core/utils/date.utils';
import { GenericStore } from '../../../../../shared/store/generic-crud.store';
import { ToastService } from '../../../../../shared/services/toast.service';
import { FacultySelectComponent } from '../../../../../shared/components/faculty-select/faculty-select.component';
import { Degree } from '../../../degrees/models/degree.model';
import { PaginationResponse } from '../../../../../shared/models/pagination-response.model';
@Component({
    selector: 'app-student-form',
    standalone: true,
    imports: [
		CommonModule,
		ReactiveFormsModule,
		BlockInvalidNumberKeysDirective,
		FormsModule,
		FacultySelectComponent,
    ],
    templateUrl: './student-form.component.html',
    styleUrl: './student-form.component.scss'
})
export class StudentFormComponent {
	@Input() studentData?: User;
	@Input() isPreview: boolean = false;
	@Output() submitFormEvent = new EventEmitter<User>();
	studentForm!: FormGroup;
	formStatusEnum = FormStatus;
	validationErrorMessage = ValidatioErrorMessage;
	minYear: string[] = [];
	degreeList: Degree[] = [];
	years: number[] = [];
	initialYear: number = 2000;

	private destroy$ = new Subject<void>();
	facultyOptions$ = new Subject<string>();
	faculties: Faculty[] = [];
	selectedFaculty?: Faculty;

	constructor(
		private _formBuilder: FormBuilder,
		private _toastService: ToastService,
		private _facultyService: FacultyService,
		public store: GenericStore<Faculty>,
	) {}

	ngOnInit(): void {
		this.initialize();
		this.loadFormValues();
		this.addStudentDataToForm();
	}

	private initialize(): void {
		this.initializeForm();
	}

	private async loadFormValues(): Promise<void> {
		this.years = generateYearList(this.initialYear);
		this.facultyOptions$.next("");
	}

	searchFaculty(event: { term: string, items: any }) {
		this.facultyOptions$.next(event.term)
	}

	private initializeForm(): void {
		const isEditMode = !!this.studentData;
		this.studentForm = this._formBuilder.group({
			firstName: ['', [Validators.required]],
			secondName: ['', [Validators.required]],
			ci: ['', [Validators.required]],
			phone: ['', [Validators.required]],
			rol: [UserRolEnum.STUDENT, [Validators.required]],
			isAvaible: [true, [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', isEditMode ? [] : [Validators.required]],
			confirmPassword: ['', isEditMode ? [] : [Validators.required]],
			highschool: ['', [Validators.required]],
			graduationYear: ['', [Validators.required]],
			faculty: [null, [Validators.required]],
			degree: ['', [Validators.required]],
		},{
			validators: matchValidator('password', 'confirmPassword')
		});
	}

	// private generateYears(): void {
	//   const currentYear = new Date().getFullYear();
	//   const startYear = 2000;
	//   this.years = Array.from(
	//     { length: currentYear - startYear + 1 },
	//     (_, i) => new Date(`${currentYear - i}-01-01T03:00:00.000Z`).getFullYear()
	//   );
	// }

	private async addStudentDataToForm(): Promise<void> {
		if(this.studentData){
		this.studentForm.patchValue(this.studentData);
		await this.addGraduationYearToForm();
		// this.addFacultyToForm();
		// this.addCareerToForm();
		}
	}

	private async addGraduationYearToForm(): Promise<void> {
		const generateYears = await parseDateYearToNumber(this.studentData?.graduationYear);
		this.studentForm.controls['graduationYear'].setValue(generateYears);
	}

	parceDateToYear(date?: string): number {
		const year = parseDateYearToNumber(date);
		return year ? year : 0 ;
	}

	// private addFacultyToForm(): void {
	//   const facultyFounded = this.faculties.find((faculty)=>(faculty.id === this.studentData?.faculty?.id));
	//   this.studentForm.controls['faculty'].setValue(facultyFounded);
	//   this.loadCareers();
	// }

	// private addCareerToForm(): void {
	//   const careerFounded = this.degreeList.find((career)=>(career.id === this.studentData?.career?.id));
	//   this.studentForm.controls['career'].setValue(careerFounded);
	// }

	// private parseDateTuNumber(): number {
	//   return this.studentData?.graduationYear ? new Date(this.studentData.graduationYear).getFullYear() : 2024;
	// }

	async loadDegrees($facultyId: string): Promise<void> {
		this.degree.setValue('');
		await firstValueFrom(this._facultyService.getDegrees($facultyId))
		.then(
			(response: PaginationResponse<Degree>) => {
			this.degreeList = response.data;
			})
		.catch((error: Partial<HttpErrorResponse>) => {
			this._toastService.showHttpError(error.error);
		});
	}

	submit(): void {
		this.studentForm.markAllAsTouched();
		if (this.studentForm.valid) {
			this.setGraduationDateFormat()
			this.submitFormEvent.emit(this.studentForm.value);
		}
	}

	private setGraduationDateFormat(): void {
		const dateString = new Date(`${this.studentForm.value.graduationYear}-01-01T00:00:00.000Z`).toISOString();
		this.studentForm.controls['graduationYear'].setValue(dateString);
	}

	get firstName() {
		return this.studentForm?.controls['firstName'];
	}

	get secondName() {
		return this.studentForm?.controls['secondName'];
	}

	get ci() {
		return this.studentForm?.controls['ci'];
	}

	get phone() {
		return this.studentForm?.controls['phone'];
	}

	get email() {
		return this.studentForm?.controls['email'];
	}

	get password() {
		return this.studentForm?.controls['password'];
	}

	get confirmPassword() {
		return this.studentForm.controls['confirmPassword'];
	}

	get highschool() {
		return this.studentForm.controls['highschool'];
	}

	get graduationYear () {
		return this.studentForm.controls['graduationYear'];
	}

	get isAvaible() {
		return this.studentForm.controls['isAvaible'];
	}

	get degree() {
		return this.studentForm.controls['degree'];
	}

	get faculty() {
		return this.studentForm.controls['faculty']
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}