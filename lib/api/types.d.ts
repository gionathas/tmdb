// COMMON TYPES
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: number;
  message: string;
}

// TMDB API TYPES
export interface TmdbPaginatedResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}
