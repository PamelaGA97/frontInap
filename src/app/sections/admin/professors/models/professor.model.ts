import { BaseModel } from "../../../../shared/models/baseModel.model";
import { ClassSchedule } from "../../class-schedule/models/class-schedule.model";
import { Course } from "../../courses/model/course.model";
import { Faculty } from "../../faculties/models/faculty.model";
import { User } from "../../users/model/user.model";

export interface Professor extends BaseModel{
    id: string,
    course?: Course,
    faculty?: Faculty,
    user: User,
    classSchedules?: ClassSchedule[]
}