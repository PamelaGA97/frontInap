import { Faculty } from '../../faculties/models/faculty.model';
import { FacultyCourseStatus } from '../enums/FacultyCourseStatus.enum';

export interface FacultyCourse {
    id?: string,
    name?: string,
    room?: string,
    amount?: number,
    initDate?: Date,
    finishDate?: Date,
    state?: FacultyCourseStatus,
    faculty?: Faculty,
}