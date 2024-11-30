import { Course } from '../../courses/model/course.model';
import { Faculty } from '../../faculties/models/faculty.model';
import { Professor } from '../../professors/models/professor.model';
import { Student } from '../../students/models/student.model';

export interface FacultyCourse {
    id: string,
    faculty?: Faculty,
    professors?: Professor[],
    courses?: Course[],
    students?: Student[],
    initDate?: Date,
    finishDate?: Date
}