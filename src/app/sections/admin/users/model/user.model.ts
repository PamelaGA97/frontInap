import { UserRolEnum } from "../enums/user-rol.enum";
import { UserEnum } from "../enums/user-type.enum";

export interface User {
    id?: string,
    firstName?: string,
    secondName?: string,
    phone?: number,
    ci?: string,
    email: string;
    // type?: UserEnum;
    rol?: UserRolEnum,
    isAvaible?: boolean;
    password?: string;
    salary?: number;
    initialDate?: Date;
    finishDate?: Date;
    turn?: string;
}