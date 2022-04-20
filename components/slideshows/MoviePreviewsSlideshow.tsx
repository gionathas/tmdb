import { useRouter } from "next/router";
import React from "react";
import { Genre } from "../../@types/models/genre";
import { MoviePreview } from "../../@types/models/movie";
import Properties from "../../config/properties";
import MoviePreviewCard, {
  size as MovieCardStyle,
  variant as MovieCardvariant,
} from "../cards/MoviePreviewCard";
import Slideshow from "./Slideshow";

const { movieSlideshowScrollXOffset: scrollOffset } = Properties;

const MoviePreviewSlideshow = ({
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
  const router = useRouter();
  return (
    <Slideshow
      title={<h2 className="text-2xl font-light text-gray-200">{title}</h2>}
      classname=""
      scrollOffset={scrollOffset}
    >
      {movies.map((movie) => (
        <MoviePreviewCard
          key={movie.id}
          movie={movie}
          genresMap={genresMap}
          size={cardSize}
          variant={variant}
          showVote={showVotes}
        />
      ))}
    </Slideshow>
  );
};

export default MoviePreviewSlideshow;
