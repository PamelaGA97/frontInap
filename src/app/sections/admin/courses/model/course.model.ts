import { BaseModel } from "../../../../shared/models/baseModel.model"

export interface Course extends BaseModel {
    id: string,
    name?: string
}