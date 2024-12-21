import { Component, EventEmitter, Input, Output, output, SimpleChanges } from '@angular/core';
import { ClassSchedule } from '../../models/class-schedule.model';
import { ClassScheduleService } from '../../services/class-schedule.service';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ErrorHandler } from '../../../../../shared/models/errorHandler.model';
import { ToastService } from '../../../../../shared/services/toast.service';
import { Professor } from '../../../professors/models/professor.model';

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent {
  @Input() classScheduleDataList?: ClassSchedule[];
  @Input() addClassSchedule?: ClassSchedule;
  @Input() isPreview?: boolean = false;
  @Output() submitClassSchedule = new EventEmitter<ClassSchedule[]>;
  @Output() submitSchedule = new EventEmitter<ClassSchedule>;
  classSchedules: ClassSchedule[] = [];
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  hours: string[] = ['07:30 - 09:00', '09:00 - 10:30', '10:30 - 12:00', '12:00 - 13:30', '14:00 - 15:30', '15:30 - 17:00', '17:00 - 18:30', '18:30 - 20:00']
  matrix: { [day: string]: { [hour: string]: any } } = {};
  classSchedulesSelected: ClassSchedule[] = [];

  constructor(
    private classScheduleService: ClassScheduleService,
    private toastService: ToastService
  ) {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['classScheduleDataList'].currentValue && changes['classScheduleDataList'].currentValue.length > 0) {
      this.setClassScheduleDataToMatriz();
    }
  }

  async ngOnInit(): Promise<void> {
    await this.loadClassSchedule();
    this.initializeMatriz();
    this.setClassScheduleDataToMatriz();
  }
  
  private initialize(): void {
    this.createMatrix();
  }

  reload(): void {
    this.initializeMatriz();
    this.setClassScheduleDataToMatriz();
  }

  private async loadClassSchedule(): Promise<void> {
    await firstValueFrom(this.classScheduleService.getAll())
      .then(
        (classSchedules: ClassSchedule[]) => {
          this.classSchedules = classSchedules;
        }
      ).catch(
        (error: ErrorHandler) => {
          this.toastService.showHttpError(error);
        }
      );
  }

  private createMatrix(): void {
    this.days.forEach((day) => {
      this.matrix[day] = {};
      this.hours.forEach((hour) => {
        this.matrix[day][hour] = null;
      });
    });
  }

  private initializeMatriz(): void {
    this.classSchedules.map((classSchedule: ClassSchedule) => {
      const { day, hour } = classSchedule;
      this.matrix[day][hour] = classSchedule;
    });
  }
  
  private setClassScheduleDataToMatriz(): void {
    if(this.classScheduleDataList &&  this.classScheduleDataList?.length>0) {
      this.classScheduleDataList?.map(
        (classSchedule: ClassSchedule) => {
          if (this.matrix[classSchedule.day][classSchedule.hour]) {
            this.classSchedulesSelected.push(this.matrix[classSchedule.day][classSchedule.hour]);
          }
        }
      );
    }
  }
  
  private addOptionSelected(day: string, hour: string, professor?: Professor): void {
    const classScheduleIndex = this.classSchedulesSelected.findIndex(
      (classSchedules) => (classSchedules.day === day && classSchedules.hour === hour)
    );

    if (classScheduleIndex === -1) {
      const classScheduleSelected: ClassSchedule = this.matrix[day][hour];
      classScheduleSelected.professor = professor;
      this.classSchedulesSelected.push(classScheduleSelected);
    } else {
      this.classSchedulesSelected.splice(classScheduleIndex,1)
    }
  }

  searchOptionSelected(day: string, hour: string): boolean {
    let res = false;
    if(this.classSchedulesSelected) {
      const classScheduleIndex = this.classSchedulesSelected.findIndex((schedule) => schedule.day === day && schedule.hour === hour);
      if (classScheduleIndex > -1) {
        res = true;
      }
    }
    return res;
  }

  optionSelected(day: string, hour: string, professor?: Professor): void {
    if (!this.isPreview) {
      this.addOptionSelected(day, hour, professor);
    } else {
      this.emitOptionSelected(day, hour, professor);
    }
  }
  
  private emitOptionSelected(day: string, hour: string, professor?: Professor): void {
    const classScheduleFounded = this.classScheduleDataList?.find(
      (classSchedule: ClassSchedule) => (classSchedule.day === day && classSchedule.hour === hour));
      if (classScheduleFounded) {
        this.submitSchedule.emit(classScheduleFounded);
      }
  }

  submit(): void {
    this.submitClassSchedule.emit(this.classSchedulesSelected);
  }

  setclassScheduleDataList(classSchedule: ClassSchedule[]) {
    this.classScheduleDataList = classSchedule;
  }
}
