import { BaseModel } from "../../../../shared/models/baseModel.model";
import { Course } from "../../courses/model/course.model";
import { Faculty } from "../../faculties/models/faculty.model";
import { User } from "../../users/model/user.model";

export interface Professor extends BaseModel{
    id: string,
    course?: Course,
    faculty?: Faculty,
    user: User
}