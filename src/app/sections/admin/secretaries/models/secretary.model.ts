import { Branch } from "../../../../shared/enums/branch.enum";
import { TurnsJob } from "../../../../shared/enums/turns-job.enum";
import { BaseModel } from "../../../../shared/models/baseModel.model";
import { User } from "../../users/model/user.model";

export interface Secretary extends BaseModel {
    id: string,
    turn?: TurnsJob,
    branch?: Branch,
    user: User
}
