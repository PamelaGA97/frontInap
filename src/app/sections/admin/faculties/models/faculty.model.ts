import { BaseModel } from "../../../../shared/models/baseModel.model"
import { Career } from "../../careers/models/career.model"

export interface Faculty extends BaseModel {
    id: string,
    name?: string
    careers?: Career[],
}