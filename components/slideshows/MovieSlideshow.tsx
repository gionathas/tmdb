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
  showVotes?: boolean;
  scrollOffset?: number;
} & Pick<React.ComponentProps<typeof Slideshow>, "className" | "arrowVariant">;

const MovieSlideshow = ({
  title,
  movies,
  cardSize = "md",
  cardVariant = "base",
  showVotes = false,
  scrollOffset = Properties.movieSlideshowDefaultScrollXOffset,
  ...rest
}: Props) => {
  return (
    <Slideshow
      title={<h2 className="text-2xl font-light text-gray-200">{title}</h2>}
      scrollOffset={scrollOffset}
      {...rest}
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
