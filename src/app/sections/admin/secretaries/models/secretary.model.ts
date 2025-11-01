import { Branch } from "../../../../shared/enums/branch.enum";
import { TurnsJob } from "../../../../shared/enums/turns-job.enum";
import { BaseModel } from "../../../../shared/models/baseModel.model";
import { UserRolEnum } from "../../users/enums/user-rol.enum";

export interface Secretary extends BaseModel {
    id: string,
    firstName?: string;
    secondName?: string;
    ci?: string;
    phone?: string;
    rol?: UserRolEnum;
    email?: string;
    password?: string;
    isAvaible?: boolean;
    salary?: number
    turn?: TurnsJob;
    // branch?: Branch,
}
