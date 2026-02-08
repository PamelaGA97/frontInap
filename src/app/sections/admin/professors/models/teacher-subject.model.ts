import { Course } from "../../courses/model/course.model";
import { Faculty } from "../../faculties/models/faculty.model";

export interface TeacherSubject {
    faculty: Faculty,
    course: Course
}