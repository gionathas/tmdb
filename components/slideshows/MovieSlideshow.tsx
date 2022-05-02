import { ArrowVariant } from "components/miscellaneous/buttons/ArrowButton";
import React from "react";
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
  cardSize?: MovieCardStyle;
  cardVariant?: MovieCardVariant;
  arrowVariant?: ArrowVariant;
  scrollOffset?: number;
  showVotes?: boolean;
  className?: string;
};

const { movieSlideshowDefaultScrollXOffset } = Properties;

const MovieSlideshow = ({
  title,
  movies,
  cardSize = "md",
  cardVariant = "base",
  arrowVariant = "base",
  scrollOffset = movieSlideshowDefaultScrollXOffset,
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
