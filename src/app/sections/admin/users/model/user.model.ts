import { UserRolEnum } from "../enums/user-rol.enum";

export interface User {
    id?: string,
    rol?: UserRolEnum,
    firstName?: string,
    secondName?: string,
    ci?: string,
    cellphone?: number
}