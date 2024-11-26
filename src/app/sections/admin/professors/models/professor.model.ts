import { BaseModel } from "../../../../shared/models/baseModel.model";
import { User } from "../../users/model/user.model";

export interface Professor extends BaseModel{
    id: string,
    career?: string,
    course?: string,
    faculty?: string,
    user: User
}