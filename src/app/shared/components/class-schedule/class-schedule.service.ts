import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassSchedule } from './class-schedule.entity';
import { Repository } from 'typeorm';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';

@Injectable()
export class ClassScheduleService {
    constructor(
        @InjectRepository(ClassSchedule)
        private readonly classSchsduleRepository: Repository<ClassSchedule>
    ) {}

    async findAll(query: Record<string, any>): Promise<ClassSchedule[]> {
        const filters: Record<string, any> = {};
        if(query.hour) {
            filters.hour = query.hour;
        }

        if(query.day) {
            filters.day = query.day;
        }

        return this.classSchsduleRepository.find({
            where: filters,
        })
    }

    async findOne(id: string): Promise<ClassSchedule> {
        return this.classSchsduleRepository.findOne({
            where: { id }
        });
    }

    async create(sheduleData: CreateClassScheduleDto): Promise<ClassSchedule> {
        const schedule = this.classSchsduleRepository.create(sheduleData);
        return this.classSchsduleRepository.save(schedule);
    }

    async update(id: string, updateClassScheduleDto: UpdateClassScheduleDto): Promise<ClassSchedule> {
        const entity = await this.findOne(id);
        if (!entity) {
            return null;
        }
        Object.assign(entity, updateClassScheduleDto);
        return this.classSchsduleRepository.save(entity);
    }

    async remove(id: string): Promise<void> {
        await this.classSchsduleRepository.softDelete(id);
    }

    async restore(id: string): Promise<void> {
        await this.classSchsduleRepository.restore(id);
    }
}
