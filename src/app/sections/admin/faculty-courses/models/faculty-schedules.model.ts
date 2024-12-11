import { ClassSchedule } from "../../class-schedule/models/class-schedule.model";
import { Faculty } from "../../faculties/models/faculty.model";

export interface FacultySchedules {
    room?: string,
    amount?: number,
    initDate?: Date,
    finishDate?: Date
    faculty?: Faculty,
    professorSchedules?: ClassSchedule[]
}