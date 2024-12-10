import { Course } from '../../courses/model/course.model';
import { Faculty } from '../../faculties/models/faculty.model';
import { Professor } from '../../professors/models/professor.model';
import { Student } from '../../students/models/student.model';

export interface FacultyCourse {
    id: string,
    room?: string,
    initDate?: Date,
    finishDate?: Date
    faculty?: Faculty,
    //professors?: Professor[],
    //courses?: Course[],
    //students?: Student[],
}