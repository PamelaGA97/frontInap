export class TimeSlot {
    startTime: string;
    endTime: string;
    label: string;

    constructor(startTime: string, endTime: string) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.label = `${startTime} - ${endTime}`;
    }
}