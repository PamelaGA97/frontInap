import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ClassScheduleService } from './class-schedule.service';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';

@Controller('class-schedules')
export class ClassScheduleController {
    constructor(
        private classScheduleService: ClassScheduleService
    ) {}

    @Get()
    findAll(@Query() query: Record<string, any>) {
        return this.classScheduleService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.classScheduleService.findOne(id);
    }

    @Post()
    create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
        return this.classScheduleService.create(createClassScheduleDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateClassScheduleDto: UpdateClassScheduleDto) {
        return this.classScheduleService.update(id, updateClassScheduleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.classScheduleService.remove(id);
    }

    @Patch(':id/restore')
    restore(@Param('id') id: string) {
        return this.classScheduleService.restore(id);
    }
}
