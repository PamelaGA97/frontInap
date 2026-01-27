import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Day } from '../../enums/day.enum';
import { TeacherAvailability } from './models/teacher-availability.model';
import { TimeSlot } from './models/time-slot.model';

export interface DaySchedule {
  day: Day | string;
}

@Component({
  selector: 'app-teacher-schedule',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeacherScheduleComponent),
      multi: true
    }
  ],
  templateUrl: './teacher-schedule.component.html',
  styleUrl: './teacher-schedule.component.scss'
})
export class TeacherScheduleComponent {
  @Input() isPreview: boolean = false;
  @Input() teacherScheduleAvailabilities: TeacherAvailability[] = []; 
  disabled: boolean = false;
  timeSlots: TimeSlot[] = [
    new TimeSlot('06:45', '08:15'),
    new TimeSlot('08:15', '09:45'),
    new TimeSlot('09:45', '11:15'),
    new TimeSlot('11:15', '12:45'),
    new TimeSlot('12:45', '14:15'),
    new TimeSlot('14:15', '15:45'),
    new TimeSlot('15:45', '17:15'),
    new TimeSlot('17:15', '18:45'),
    new TimeSlot('18:45', '20:15'),
    new TimeSlot('20:15', '21:45'),
  ];

  days: DaySchedule[] = [
    { day: 'Lunes' },
    { day: 'Martes' },
    { day: 'Miércoles' },
    { day: 'Jueves' },
    { day: 'Viernes' },
    { day: 'Sábado' }
  ];

  private onChange: (value: TeacherAvailability[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {}

  selectSchedule(daySchedule: DaySchedule, timeSlot: TimeSlot): void {
    if (this.disabled || this.isPreview) {
      return;
    }

    const newScheduleAvailability = new TeacherAvailability(
      daySchedule.day,
      timeSlot.startTime,
      timeSlot.endTime
    );

    const teacherAvailabilityFounded = this._foundTeacherSchedule(newScheduleAvailability);

    if (teacherAvailabilityFounded !== -1) {
      this.teacherScheduleAvailabilities.splice(teacherAvailabilityFounded, 1);
    } else {
      this.teacherScheduleAvailabilities.push(newScheduleAvailability);
    }

    this.onChange([...this.teacherScheduleAvailabilities]);
    this.onTouched();
  }

  isTeacherScheduleSelected(daySchedule: DaySchedule, timeSlot: TimeSlot): boolean {
    const scheduleToFind = new TeacherAvailability(
      daySchedule.day,
      timeSlot.startTime,
      timeSlot.endTime
    );
    const teacherAvailabilityFounded = this._foundTeacherSchedule(scheduleToFind);
    return teacherAvailabilityFounded !== -1;
  }

  private _foundTeacherSchedule(teacherAvailability: TeacherAvailability): number {
    const teacherAvailabilityFounded = this.teacherScheduleAvailabilities
      .findIndex((scheduleSelected) => {
        return scheduleSelected.compareTo(teacherAvailability);
      });
    return teacherAvailabilityFounded;
  }

  writeValue(value: TeacherAvailability[]): void {
    this.teacherScheduleAvailabilities = value ? [...value] : [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
