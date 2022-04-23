import { getMovieGenresFromIds } from "lib/api/genre-api";
import { useMemo } from "react";
import { Genre } from "../@types/models/genre";
import { MoviePreview } from "../@types/models/movie";

const useMovieGenres = (
  movie: MoviePreview,
  genresMap: Genre[],
  size?: number
) => {
  const { genre_ids } = movie;
  const genres = useMemo(
    () => getMovieGenresFromIds(genre_ids, genresMap).slice(0, size),
    [genre_ids, genresMap, size]
  );
  return { genres };
};

export default useMovieGenres;
