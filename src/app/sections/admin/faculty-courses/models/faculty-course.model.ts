import { ClassSchedule } from '../../class-schedule/models/class-schedule.model';
import { Course } from '../../courses/model/course.model';
import { Faculty } from '../../faculties/models/faculty.model';
import { Professor } from '../../professors/models/professor.model';
import { Student } from '../../students/models/student.model';

export interface FacultyCourse {
    id?: string,
    name?: string,
    room?: string,
    amount?: number,
    initDate?: Date,
    finishDate?: Date
    faculty?: Faculty,
    //professorSchedules?: ClassSchedule[]
}