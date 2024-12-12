import { BaseModel } from "../../../../shared/models/baseModel.model";
import { Career } from "../../careers/models/career.model";
import { Faculty } from "../../faculties/models/faculty.model";
import { User } from "../../users/model/user.model";
import { PaymentStatus } from "../enums/payment-status.enum";

export interface Student extends BaseModel{
    id: string,
    user: User,
    highschool?: string,
    graduationYear?: Date,
    faculty?: Faculty,
    career?: Career,
    paymentStatus?: PaymentStatus
}