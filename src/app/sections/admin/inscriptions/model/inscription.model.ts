import { FacultyCourse } from "../../faculty-courses/models/faculty-course.model";
import { Student } from "../../students/models/student.model";

export interface Inscription {
    id?: string,
    facultyCourse?: FacultyCourse,
    students?: Student[],
}