import { TeacherAvailability } from '../models/teacher-availability.model';

export const compareTeacherSchedules = (teacherAvailabilityA: TeacherAvailability, teacherAvailabilityB: TeacherAvailability): boolean => {
    return teacherAvailabilityA.day === teacherAvailabilityB.day &&
           teacherAvailabilityA.startTime === teacherAvailabilityB.startTime &&
           teacherAvailabilityA.endTime === teacherAvailabilityB.endTime;
}