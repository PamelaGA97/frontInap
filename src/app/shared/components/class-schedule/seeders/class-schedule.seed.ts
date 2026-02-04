import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassSchedule } from '../class-schedule.entity';

@Injectable()
export class ClassScheduleSeeder {
  constructor(
    @InjectRepository(ClassSchedule)
    private readonly classScheduleRepository: Repository<ClassSchedule>,
  ) {}

  async seed() {
    const schedules = [
        {
            hour: '07:30 - 09:00',
            day: 'Lunes'
          },
          {
            hour: '09:00 - 10:30',
            day: 'Lunes'
          },
          {
            hour: '10:30 - 12:00',
            day: 'Lunes'
          },
          {
            hour: '12:00 - 13:30',
            day: 'Lunes'
          },
          {
            hour: '14:00 - 15:30',
            day: 'Lunes'
          },
          {
            hour: '15:30 - 17:00',
            day: 'Lunes'
          },
          {
            hour: '17:00 - 18:30',
            day: 'Lunes'
          },
          {
            hour: '18:30 - 20:00',
            day: 'Lunes'
          },
          {
            hour: '07:30 - 09:00',
            day: 'Martes'
          },
          {
            hour: '09:00 - 10:30',
            day: 'Martes'
          },
          {
            hour: '10:30 - 12:00',
            day: 'Martes'
          },
          {
            hour: '12:00 - 13:30',
            day: 'Martes'
          },
          {
            hour: '14:00 - 15:30',
            day: 'Martes'
          },
          {
            hour: '15:30 - 17:00',
            day: 'Martes'
          },
          {
            hour: '17:00 - 18:30',
            day: 'Martes'
          },
          {
            hour: '18:30 - 20:00',
            day: 'Martes'
          },
          {
            hour: '07:30 - 09:00',
            day: 'Miércoles'
          },
          {
            hour: '09:00 - 10:30',
            day: 'Miércoles'
          },
          {
            hour: '10:30 - 12:00',
            day: 'Miércoles'
          },
          {
            hour: '12:00 - 13:30',
            day: 'Miércoles'
          },
          {
            hour: '14:00 - 15:30',
            day: 'Miércoles'
          },
          {
            hour: '15:30 - 17:00',
            day: 'Miércoles'
          },
          {
            hour: '17:00 - 18:30',
            day: 'Miércoles'
          },
          {
            hour: '18:30 - 20:00',
            day: 'Miércoles'
          },
          {
            hour: '07:30 - 09:00',
            day: 'Jueves'
          },
          {
            hour: '09:00 - 10:30',
            day: 'Jueves'
          },
          {
            hour: '10:30 - 12:00',
            day: 'Jueves'
          },
          {
            hour: '12:00 - 13:30',
            day: 'Jueves'
          },
          {
            hour: '14:00 - 15:30',
            day: 'Jueves'
          },
          {
            hour: '15:30 - 17:00',
            day: 'Jueves'
          },
          {
            hour: '17:00 - 18:30',
            day: 'Jueves'
          },
          {
            hour: '18:30 - 20:00',
            day: 'Jueves'
          },
          {
            hour: '07:30 - 09:00',
            day: 'Viernes'
          },
          {
            hour: '09:00 - 10:30',
            day: 'Viernes'
          },
          {
            hour: '10:30 - 12:00',
            day: 'Viernes'
          },
          {
            hour: '12:00 - 13:30',
            day: 'Viernes'
          },
          {
            hour: '14:00 - 15:30',
            day: 'Viernes'
          },
          {
            hour: '15:30 - 17:00',
            day: 'Viernes'
          },
          {
            hour: '17:00 - 18:30',
            day: 'Viernes'
          },
          {
            hour: '18:30 - 20:00',
            day: 'Viernes'
          },
          {
            hour: '07:30 - 09:00',
            day: 'Sábado'
          },
          {
            hour: '09:00 - 10:30',
            day: 'Sábado'
          },
          {
            hour: '10:30 - 12:00',
            day: 'Sábado'
          },
          {
            hour: '12:00 - 13:30',
            day: 'Sábado'
          },
          {
            hour: '14:00 - 15:30',
            day: 'Sábado'
          },
          {
            hour: '15:30 - 17:00',
            day: 'Sábado'
          },
          {
            hour: '17:00 - 18:30',
            day: 'Sábado'
          },
          {
            hour: '18:30 - 20:00',
            day: 'Sábado'
          }
    ];

    for (const schedule of schedules) {
      const existingSchedule = await this.classScheduleRepository.findOne({
        where: { hour: schedule.hour, day: schedule.day },
      });

      if (!existingSchedule) {
        const newSchedule = this.classScheduleRepository.create(schedule);
        await this.classScheduleRepository.save(newSchedule);
        console.log(`Horario creado: ${schedule.day} ${schedule.hour}`);
      } else {
        console.log(
          `Horario omitido (ya existe): ${schedule.day} ${schedule.hour}`,
        );
      }
    }
  }
}