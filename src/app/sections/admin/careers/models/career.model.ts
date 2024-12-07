import { CareerTimeEnum } from "../enums/career-time.enum";

export interface Career {
    id?: string,
    name?: string,
    courseTime?: CareerTimeEnum
}