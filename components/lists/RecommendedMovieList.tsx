import MovieCard from "components/cards/MovieCard";
import React from "react";
import { MoviePreview } from "../../@types/models/movie";
import List from "./List";

type Props = {
  recomendations: MoviePreview[];
  className?: string;
};

const RecommendedMovieList = ({ recomendations, className }: Props) => {
  const title = <h2 className="text-xl font-light md:text-2xl">Recommended</h2>;
  const noMoviesWarningTitle = (
    <h2 className="ml-4 text-sm font-light">No Recomendations found!</h2>
  );

  return (
    <div className={className}>
      <List
        className="grid grid-cols-2 mt-4 ml-auto gap-x-4 gap-y-10"
        title={title}
        emptyTitle={noMoviesWarningTitle}
        items={recomendations}
        renderItem={(movie) => (
          <MovieCard key={movie.id} movie={movie} size="sm" />
        )}
        keyExtractor={(movie) => String(movie.id)}
      />
    </div>
  );
};

export default RecommendedMovieList;
