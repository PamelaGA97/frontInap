import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Day } from '../../enums/day.enum';
import { TeacherAvailability } from './models/TeacherAvailability.model';

export interface TimeSlot {
  startTime: string;
  endTime: string;
  label: string;
}

export interface DaySchedule {
  day: Day | string;
  slots: { [key: string]: boolean };
}

// export interface TeacherAvailability {
//   dayOfWeek: string;
//   startTime: string;
//   endTime: string;
// }

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
  @Input() disabled: boolean = false;

  private teacherScheduleAvailabilities: TeacherAvailability[] = [];

  timeSlots: TimeSlot[] = [
    { startTime: '06:45', endTime: '08:15', label: '06:45 - 08:15' },
    { startTime: '08:15', endTime: '09:45', label: '08:15 - 09:45' },
    { startTime: '09:45', endTime: '11:15', label: '09:45 - 11:15' },
    { startTime: '11:15', endTime: '12:45', label: '11:15 - 12:45' },
    { startTime: '12:45', endTime: '14:15', label: '12:45 - 14:15' },
    { startTime: '14:15', endTime: '15:45', label: '14:15 - 15:45' },
    { startTime: '15:45', endTime: '17:15', label: '15:45 - 17:15' },
    { startTime: '17:15', endTime: '18:45', label: '17:15 - 18:45' },
    { startTime: '18:45', endTime: '20:15', label: '18:45 - 20:15' },
    { startTime: '20:15', endTime: '21:45', label: '20:15 - 21:45' },
  ];

  days: DaySchedule[] = [
    { day: 'Lunes', slots: {} },
    { day: 'Martes', slots: {} },
    { day: 'Miércoles', slots: {} },
    { day: 'Jueves', slots: {} },
    { day: 'Viernes', slots: {} },
    { day: 'Sábado', slots: {} }
  ];

  private onChange: (value: TeacherAvailability[]) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.initializeSlots();
  }

  initializeSlots(): void {
    // this.days.forEach(day => {
    //   this.timeSlots.forEach(slot => {
    //     const key = `${slot.startTime}-${slot.endTime}`;
    //     day.slots[key] = false;
    //   });
    // });
  }

  // toggleSlot(day: DaySchedule, slot: TimeSlot, event: Event): void {
  //   if (this.disabled || this.isPreview) {
  //     event.preventDefault();
  //     return;
  //   }

  //   const key = `${slot.startTime}-${slot.endTime}`;
  //   day.slots[key] = !day.slots[key];
    
  //   this.onTouched();
  //   this.emitValue();
  // }

  // isSlotSelected(day: DaySchedule, slot: TimeSlot): boolean {
  //   const key = `${slot.startTime}-${slot.endTime}`;
  //   return day.slots[key] || false;
  // }

  // selectAllDay(day: DaySchedule, event: Event): void {
  //   event.preventDefault();
  //   if (this.disabled || this.isPreview) return;

  //   const allSelected = this.isDayFullySelected(day);
    
  //   this.timeSlots.forEach(slot => {
  //     const key = `${slot.startTime}-${slot.endTime}`;
  //     day.slots[key] = !allSelected;
  //   });

  //   this.emitValue();
  // }

  // isDayFullySelected(day: DaySchedule): boolean {
  //   return this.timeSlots.every(slot => {
  //     const key = `${slot.startTime}-${slot.endTime}`;
  //     return day.slots[key];
  //   });
  // }

  // clearAll(): void {
  //   if (this.disabled || this.isPreview) return;

  //   this.days.forEach(day => {
  //     this.timeSlots.forEach(slot => {
  //       const key = `${slot.startTime}-${slot.endTime}`;
  //       day.slots[key] = false;
  //     });
  //   });

  //   this.emitValue();
  // }

  // private emitValue(): void {
  //   const availabilities: TeacherAvailability[] = [];

  //   this.days.forEach(day => {
  //     this.timeSlots.forEach(slot => {
  //       const key = `${slot.startTime}-${slot.endTime}`;
  //       if (day.slots[key]) {
  //         availabilities.push({
  //           day: day.day,
  //           startTime: slot.startTime,
  //           endTime: slot.endTime
  //         } as TeacherAvailability);
  //       }
  //     });
  //   });

  //   this.onChange(availabilities);
  // }

  // // ControlValueAccessor methods
  // writeValue(availabilities: TeacherAvailability[]): void {
  //   if (!availabilities || availabilities.length === 0) {
  //     this.initializeSlots();
  //     return;
  //   }

  //   // Resetear todos los slots
  //   this.initializeSlots();

  //   // Marcar los slots según las disponibilidades recibidas
  //   // availabilities.forEach(availability => {
  //   //   const day = this.days.find(d => d.day === availability.dayOfWeek);
  //   //   if (day) {
  //   //     const key = `${availability.startTime}-${availability.endTime}`;
  //   //     day.slots[key] = true;
  //   //   }
  //   // });
  // }

  // registerOnChange(fn: (value: TeacherAvailability[]) => void): void {
  //   this.onChange = fn;
  // }

  // registerOnTouched(fn: () => void): void {
  //   this.onTouched = fn;
  // }

  // setDisabledState(isDisabled: boolean): void {
  //   this.disabled = isDisabled;
  // }

  // getSelectedCount(): number {
  //   let count = 0;
  //   this.days.forEach(day => {
  //     this.timeSlots.forEach(slot => {
  //       const key = `${slot.startTime}-${slot.endTime}`;
  //       if (day.slots[key]) count++;
  //     });
  //   });
  //   return count;
  // }











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
    console.log(this.teacherScheduleAvailabilities)
    this.onChange(this.teacherScheduleAvailabilities);
  }

  private _foundTeacherSchedule(teacherAvailability: TeacherAvailability): number {
    const teacherAvailabilityFounded = this.teacherScheduleAvailabilities
      .findIndex((scheduleSelected) => {
        return scheduleSelected.compareTo(teacherAvailability);
      });
    return teacherAvailabilityFounded;
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
}
