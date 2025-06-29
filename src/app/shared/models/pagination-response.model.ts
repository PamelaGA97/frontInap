export interface PaginationResponse<T> {
    data: T[],
    meta: PaginationMeta
}

export interface PaginationMeta {
    totalItems: number;
    currentPage: number;
    itemsForPage: number;
}