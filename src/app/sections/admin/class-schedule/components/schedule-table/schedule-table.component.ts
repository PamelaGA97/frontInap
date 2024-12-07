import { Component, EventEmitter, Output, output } from '@angular/core';
import { ClassSchedule } from '../../models/class-schedule.model';
import { ClassScheduleService } from '../../services/class-schedule.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule-table.component.html',
  styleUrl: './schedule-table.component.scss'
})
export class ScheduleTableComponent {
  @Output() submitClassSchedule = new EventEmitter<ClassSchedule[]>;
  classSchedules: ClassSchedule[] = [];
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  hours: string[] = ['07:30 - 09:00', '09:00 - 10:30', '10:30 - 12:00', '12:00 - 13:30', '14:00 - 15:30', '15:30 - 17:00', '17:00 - 18:30', '18:30 - 20:00']
  matrix: { [day: string]: { [hour: string]: any } } = {};
  classSchedulesSelected: ClassSchedule[] = [];

  constructor(
    private classScheduleService: ClassScheduleService,
  ) {
    this.initialize();
  }

  private initialize(): void {
    this.loadClassSchedule();
  }

  private async loadClassSchedule(): Promise<void> {
    this.classScheduleService.getAll().subscribe(
      (classSchedules: ClassSchedule[]) => {
        this.classSchedules = classSchedules;
        this.createMatrix();
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

    this.classSchedules.map((classSchedule: ClassSchedule) => {
      const { day, hour } = classSchedule;
      this.matrix[day][hour] = classSchedule;
    });
  }

  searchOptionSelected(day: string, hour: string): boolean {
    let res = false;
    const classScheduleIndex = this.classSchedulesSelected.findIndex((schedule) => schedule.day === day && schedule.hour === hour);
    if (classScheduleIndex > -1) {
      res = true;
    }
    return res;
  }

  addOptionSelected(day: string, hour: string): void {
    const classScheduleIndex = this.classSchedulesSelected.findIndex(
      (classSchedules) => (classSchedules.day === day && classSchedules.hour === hour)
    );

    if (classScheduleIndex === -1) {
      this.classSchedulesSelected.push(this.matrix[day][hour]);
    } else {
      this.classSchedulesSelected.splice(classScheduleIndex,1)
    }
  }

  submit(): void {
    this.submitClassSchedule.emit(this.classSchedulesSelected);
  }
}
