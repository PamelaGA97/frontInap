import { BaseModel } from "../../../../shared/models/baseModel.model";
import { User } from "../../users/model/user.model";

export interface Student extends BaseModel{
    id: string,
    user: User,
    highschool?: string,
    graduationYear?: string,
    career?: string,
    status?: string,
}