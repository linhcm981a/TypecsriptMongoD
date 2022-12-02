export interface IPaginationParams {
  limit: number;
  offset: number;
  page: number;
  sortType: number;
  sortField: string;
}
export interface IPagination {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}
