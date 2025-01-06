import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';
import { IncriptionStorageModel } from '../model/incription-storage-model.model';
@Injectable({
  providedIn: 'root'
})

export class InscriptionService {
    storageKey: string = 'incription';
    inscriptionId = 0;
    schedulesDataList: IncriptionStorageModel[] = [];

    constructor(
        private localStorageService: LocalStorageService
    ) {
        this.loadStorageDatas();
    }

    create(data: any): void {
        const storageKey = this.getStorageDatas();
    }

    private getStorageDatas(): void {
        const facultyScheduleFounded = this.localStorageService.getItem<IncriptionStorageModel[]>(this.storageKey);
        this.schedulesDataList =  facultyScheduleFounded ?? [];
    }

    private loadStorageDatas(): void {

    }
}