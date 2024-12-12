import { Injectable } from '@angular/core';
import { FacultySchedules } from '../models/faculty-schedules.model';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyCoursesStorageService {
  storageKey: string = 'faculty-schedules';
  schedulesDataList: FacultySchedules[] = [];

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  create(payload: FacultySchedules): void {
    this.getStorageDatas()
    payload.id = `${this.schedulesDataList.length}`;
    this.schedulesDataList.push(payload);
    this.localStorageService.saveItem(this.storageKey, this.schedulesDataList)
  }

  getAll(): FacultySchedules[] {
    const datas = this.localStorageService.getItem<FacultySchedules[]>(this.storageKey) ?? []; 
    return datas;
  }

  getItem(id: string): FacultySchedules | undefined {
    const facultySchedulesList = this.getAll();
    const itemFouded = facultySchedulesList.find(
      (facultySchedule: FacultySchedules) => (facultySchedule.id === id));
    return itemFouded;
  }

  private getStorageDatas(): void {
    const facultyScheduleFounded = this.localStorageService.getItem<FacultySchedules[]>(this.storageKey);
    this.schedulesDataList =  facultyScheduleFounded ?? []; 
  }
}
