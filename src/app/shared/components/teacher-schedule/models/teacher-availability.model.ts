import { BaseModel } from "../../../models/baseModel.model";

export interface TeacherAvailability extends BaseModel {
    id?: string;
    day?: string;
    startTime?: string;
    endTime?: string;
    isAvailable?: boolean;
}
