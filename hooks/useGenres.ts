import { TmdbContext } from "context/TmdbContext";
import { getMovieGenresFromIds } from "lib/api/genre-api";
import { useContext } from "react";

const useGenres = (genre_ids: number[]): string[] => {
  const { genresMap } = useContext(TmdbContext);

  return getMovieGenresFromIds(genre_ids, genresMap);
};

export default useGenres;
