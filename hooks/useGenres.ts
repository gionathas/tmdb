import { TmdbContext } from "context/TmdbContext";
import { getMovieGenresFromIds } from "lib/api/genre-api";
import { useContext, useMemo } from "react";

const useGenres = (genre_ids: number[]): string[] => {
  const { genresMap } = useContext(TmdbContext);
  const genres = useMemo(() => {
    return getMovieGenresFromIds(genre_ids, genresMap);
  }, [genre_ids, genresMap]);

  return genres;
};

export default useGenres;
