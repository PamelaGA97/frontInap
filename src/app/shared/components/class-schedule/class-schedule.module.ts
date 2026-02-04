import { Module } from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { ClassScheduleController } from './class-schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassSchedule } from './class-schedule.entity';
import { ClassScheduleSeeder } from './seeders/class-schedule.seed';

@Module({
  imports: [TypeOrmModule.forFeature([ClassSchedule])],
  providers: [ClassScheduleService, ClassScheduleSeeder],
  controllers: [ClassScheduleController],
  exports: [ClassScheduleSeeder]
})
export class ClassScheduleModule {}
