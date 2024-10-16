export interface PaginatedResult<T> {
    data: T[]
    meta: {
      total: number
      lastPage: number
      currentPage: number
      perPage: number
      prev: number | null
      next: number | null
    }
  }

  export interface PaginateOptions {
    page?: number | string;
    perPage?: number | string;
  }
  