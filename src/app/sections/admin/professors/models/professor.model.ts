import { BaseModel } from "../../../../shared/models/baseModel.model";
import { ClassSchedule } from "../../class-schedule/models/class-schedule.model";
import { Course } from "../../courses/model/course.model";
import { Faculty } from "../../faculties/models/faculty.model";
import { UserRolEnum } from "../../users/enums/user-rol.enum";

export interface Professor extends BaseModel{
    id: string,
    firstName?: string;
    secondName?: string;
    ci?: string;
    phone?: string;
    rol?: UserRolEnum;
    email?: string;
    password?: string;
    isAvaible?: boolean;
    salary?: number
    // course?: Course,
    // faculty?: Faculty,
    // classSchedules?: ClassSchedule[]
}