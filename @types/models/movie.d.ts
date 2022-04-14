import { CastCredit, CrewCredit } from "./credit";

// TODO: Refactor to types
interface Movie {
  id: number;
  title: string;
  adult: boolean;
  vote_average: number;
  poster_path?: string;
  backdrop_path?: string;
  popularity: number;
  original_language: string;
  release_date: string;
}

export interface MoviePreview extends Movie {
  genre_ids: number[];
}

export interface MovieDetail extends Movie {
  runtime?: number;
  overview: string;
  status: string;
  vote_count: number;
  production_countries: ProductionCountries[];
  tagline?: string;
  budget: number;
  revenue: number;
  genres: Genre[];
}

export interface MovieCredits {
  id: number;
  cast: CastCredit[];
  crew: CrewCredit[];
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}
