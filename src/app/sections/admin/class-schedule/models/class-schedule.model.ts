import { Professor } from "../../professors/models/professor.model";

export interface ClassSchedule {
    id: string,
    hour: string,
    day: string,
    professor?: Professor
}