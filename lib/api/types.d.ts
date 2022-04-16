// COMMON TYPES
export type ApiResponse<T> = {
  data?: T;
  error?: ApiError;
};

export type ApiError = {
  code: number;
  message: string;
};

// TMDB API TYPES
export type TmdbPaginatedResponse<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};

export type ApiResponseWithPagination<T> = ApiResponse<
  TmdbPaginatedResponse<T>
>;
