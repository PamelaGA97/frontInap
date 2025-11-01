export interface PaginationResponse<T> {
    data: T[],
    meta: PaginationMeta
}

export interface PaginationMeta {
    currentPage: number;
    itemsForPage: number;
    totalItems: number;
    hasMore: boolean;
}