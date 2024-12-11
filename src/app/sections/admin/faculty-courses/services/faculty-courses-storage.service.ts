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

  create(payload: any): void {
    this.getStorageDatas()
    this.schedulesDataList.push(payload);
    this.localStorageService.saveItem(this.storageKey, this.schedulesDataList)
  }

  getAll(): FacultySchedules[] {
    const datas = this.localStorageService.getItem<FacultySchedules[]>(this.storageKey) ?? []; 
    return datas;
  }

  private getStorageDatas(): void {
    const facultyScheduleFounded = this.localStorageService.getItem<FacultySchedules[]>(this.storageKey);
    this.schedulesDataList =  facultyScheduleFounded ?? []; 
  }
}
