import { Student } from "../../students/models/student.model";

export interface IncriptionStorageModel {
    facultyCourseId: string,
    students: Student[],
}