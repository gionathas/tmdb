import React from "react";
import { Genre } from "../@types/models/genre";
import { MoviePreview } from "../@types/models/movie";
import MovieCard from "./cards/MovieCard";

const RecommendedMovieList = ({
  recomendations,
  genresMap,
  className = "",
}: {
  recomendations: MoviePreview[];
  genresMap: Genre[];
  className?: string;
}) => {
  const noMoviesWarningTitle = (
    <h2 className="ml-4 text-sm font-light">No movies found!</h2>
  );

  const recommendedMovieList = (
    <div className="grid grid-cols-2 mt-4 gap-x-4 gap-y-10">
      {recomendations.map((movie) => (
        <MovieCard
          key={movie.id}
          genresMap={genresMap}
          movie={movie}
          size="sm"
        />
      ))}
    </div>
  );

  return (
    <div className={className}>
      <h2 className="text-xl font-light md:text-2xl">Recommended</h2>
      {recomendations.length > 0 ? recommendedMovieList : noMoviesWarningTitle}
    </div>
  );
};

export default RecommendedMovieList;