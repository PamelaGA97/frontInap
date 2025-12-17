import { BaseModel } from "../../../../shared/models/baseModel.model";
import { CareerTimeEnum } from "../enums/career-time.enum";

export interface Degree extends BaseModel {
    id?: string;
    name?: string;
    courseTime?: CareerTimeEnum;
}