import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Degree } from '../../../sections/admin/degrees/models/degree.model';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';
import { ToastService } from '../../services/toast.service';
import { PaginationResponse } from '../../models/pagination-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DegreeService } from '../../../sections/admin/degrees/services/degrees.service';

@Component({
  selector: 'app-degree-select',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  templateUrl: './degree-select.component.html',
  styleUrl: './degree-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DegreeSelectComponent),
      multi: true
    }
  ]
})
export class DegreeSelectComponent {
  degrees: Degree[] = [];
  loading: boolean = false;
  isDisabled: boolean = false;

  value: any;
  search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
    private degreesServices: DegreeService,
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
          return this.degreesServices.getAll({
            name: term,
            page: 1,
            limit: 20
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response: PaginationResponse<Degree>) => {
          this.degrees = response.data;
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
  }

  writeValue(value: any): void {
    this.value = value;
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
