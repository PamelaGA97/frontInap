import { BaseModel } from "../../../../shared/models/baseModel.model"
import { Course } from "../../courses/model/course.model"
import { Degree } from "../../degrees/models/degree.model"

export interface Faculty extends BaseModel {
    id: string,
    name?: string,
    code?: string,
    degrees?: Degree[],
    courses?: Course[]
}
