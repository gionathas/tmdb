import { variant as ArrowVariant } from "components/miscellaneous/buttons/ArrowButton";
import React from "react";
import { Genre } from "../../@types/models/genre";
import { MoviePreview } from "../../@types/models/movie";
import Properties from "../../config/properties";
import MovieCard, {
  size as MovieCardStyle,
  variant as MovieCardVariant,
} from "../cards/MovieCard";
import Slideshow from "./Slideshow";

type Props = {
  title: string;
  movies: MoviePreview[];
  genresMap: Genre[];
  cardSize?: MovieCardStyle;
  cardVariant?: MovieCardVariant;
  arrowVariant: ArrowVariant;
  showVotes?: boolean;
  className?: string;
};

const { movieSlideshowScrollXOffset: scrollOffset } = Properties;

const MovieSlideshow = ({
  title,
  movies,
  genresMap,
  cardSize = "md",
  cardVariant = "base",
  arrowVariant,
  showVotes = false,
  className = "",
}: Props) => {
  return (
    <Slideshow
      className={className}
      title={<h2 className="text-2xl font-light text-gray-200">{title}</h2>}
      arrowVariant={arrowVariant}
      scrollOffset={scrollOffset}
    >
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genresMap={genresMap}
            size={cardSize}
            variant={cardVariant}
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
