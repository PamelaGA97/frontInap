import { BaseModel } from "../../../../shared/models/baseModel.model"
import { Career } from "../../careers/models/career.model"
import { Course } from "../../courses/model/course.model"

export interface Faculty extends BaseModel {
    id: string,
    name?: string,
    code?: string,
    careers?: Career[],
    courses?: Course[]
}
