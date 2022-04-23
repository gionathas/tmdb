import React from "react";
import { Genre } from "../../@types/models/genre";
import { MoviePreview } from "../../@types/models/movie";
import Properties from "../../config/properties";
import MovieCard, {
  size as MovieCardStyle,
  variant as MovieCardvariant,
} from "../cards/MovieCard";
import Slideshow from "./Slideshow";

const { movieSlideshowScrollXOffset: scrollOffset } = Properties;

const MovieSlideshow = ({
  title,
  movies,
  genresMap,
  cardSize = "md",
  variant = "base",
  showVotes = false,
}: {
  title: string;
  movies: MoviePreview[];
  genresMap: Genre[];
  cardSize?: MovieCardStyle;
  variant?: MovieCardvariant;
  showVotes?: boolean;
}) => {
  return (
    <Slideshow
      title={<h2 className="text-2xl font-light text-gray-200">{title}</h2>}
      scrollOffset={scrollOffset}
    >
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genresMap={genresMap}
            size={cardSize}
            variant={variant}
            showVote={showVotes}
          />
        ))
      ) : (
        <h2 className="ml-4 text-sm font-light">No movies found!</h2>
      )}
    </Slideshow>
  );
};

export default MovieSlideshow;
