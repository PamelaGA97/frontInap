import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { Faculty } from '../../../sections/admin/faculties/models/faculty.model';
import { FacultyService } from '../../../sections/admin/faculties/services/facuties.service';
import { ToastService } from '../../services/toast.service';
import { PaginationResponse } from '../../models/pagination-response.model';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-faculty-select',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  templateUrl: './faculty-select.component.html',
  styleUrl: './faculty-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacultySelectComponent),
      multi: true
    }
  ]
})
export class FacultySelectComponent implements ControlValueAccessor{
  @Output() valueChange = new EventEmitter<any>();
  faculties: Faculty[] = [];
  loading: boolean = false;
  isDisabled: boolean = false;

  value: any;
  search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
    private facultyService: FacultyService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeSearch();
    this.search$.next('');
  }

  private initializeSearch(): void {
    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap( term => {
          this.loading = true;
          return this.facultyService.getAll({
            name: term,
            page: 1,
            limit: 20
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: PaginationResponse<Faculty>) => {
          this.faculties = response.data;
          this.loading = false;
        },
        error: (error: Partial<HttpErrorResponse>) => {
          this.toastService.showHttpError(error.error);
          this.loading = false;
        }
      }
    );
  }

  onSearch(text: string) {
    this.search$.next(text);
  }

  handleSelect(val: any) {
    this.value = val;
    this.onChange(val);
    this.valueChange.emit(this.value);
  }

  writeValue(value: any): void {
    this.value = value;

    if (value && this.faculties.length === 0) {
    this.search$.next('');
  }
  }

  registerOnChange(change: any): void {
    this.onChange = change;
  }

  registerOnTouched(touched: any): void {
    this.onTouched = touched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
