import { swrFetcher } from "config/clients";
import { getMovieGenresFromIds } from "lib/api/genre-api";
import { ApiResponse } from "lib/api/types";
import useSWRImmutable from "swr/immutable";
import { Genre } from "../@types/models/genre";

/**
 * This hook return the list of genres mapped by the ids passed as input.
 * It fetches and cache the genresMap using the swr hook (so it will be fetched on the client side).
 * All revalidation methods are disabled because the genresMap are remote static data (it will not change very often),
 * so the first request can be enough for the entire session.
 */
const useGenres = (genre_ids: number[]) => {
  const {
    data: res,
    error,
    isValidating,
  } = useSWRImmutable<ApiResponse<Genre[]>>("/api/genres", swrFetcher);

  let genres: string[] = [];

  if (res && !error && !isValidating) {
    genres = getMovieGenresFromIds(genre_ids, res.data ?? []);
  }

  return { genres, isLoading: !error && !res };
};

export default useGenres;
