import { computed, Injectable, signal } from "@angular/core";
import { PaginationMeta } from '../models/pagination-response.model';

@Injectable({ providedIn: 'root' })
export class GenericStore<T> {
    private entitiesSig = signal<T[]>([]);
    private paginationSig = signal<PaginationMeta>({currentPage: 1, itemsForPage: 15, totalItems: 0, hasMore: true});

    entities = computed(() => this.entitiesSig());
    pagination = computed(() => this.paginationSig());
    
    setEntities(data: T[], pagination: PaginationMeta): void {
        this.entitiesSig.set(data);
        this.paginationSig.set(pagination)
    }

    addEntities(data: T[], pagination: PaginationMeta): void {
        this.entitiesSig.set([...this.entitiesSig(), ...data]);
        this.paginationSig.set(pagination);
    }

    addPaginationDetail(pagination: PaginationMeta): void {
        this.paginationSig.set(pagination);
    }

    clear(): void {
        this.entitiesSig.set([]);
        this.paginationSig.set({currentPage: 1, itemsForPage: 15, totalItems: 0, hasMore: true});
    }
}