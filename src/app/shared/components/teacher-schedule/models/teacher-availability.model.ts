export class TeacherAvailability {
    day: string;
    startTime: string;
    endTime: string;

    constructor(day: string, startTime: string, endTime: string) {
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    compareTo(otherTeacherAvailability: TeacherAvailability): boolean {
        return this.day === otherTeacherAvailability.day &&
               this.startTime === otherTeacherAvailability.startTime &&
               this.endTime === otherTeacherAvailability.endTime;
    }
}