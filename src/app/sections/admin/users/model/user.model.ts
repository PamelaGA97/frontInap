import { TeacherAvailability } from "../../../../shared/components/teacher-schedule/models/teacher-availability.model";
import { Course } from "../../courses/model/course.model";
import { Degree } from "../../degrees/models/degree.model";
import { Faculty } from "../../faculties/models/faculty.model";
import { UserRolEnum } from "../enums/user-rol.enum";

export interface User {
    id: string,
    firstName?: string,
    secondName?: string,
    phone?: number,
    ci?: string,
    email: string;
    rol?: UserRolEnum,
    isAvaible?: boolean;
    password?: string;
    salary?: number;
    initialDate?: Date;
    finishDate?: Date;
    turn?: string;

    highschool: string;
    graduationYear: string;

    faculty?: Faculty;
    degree?: Degree;
    courses?: Course[];
    teacherAvailabilities?: TeacherAvailability[];
}