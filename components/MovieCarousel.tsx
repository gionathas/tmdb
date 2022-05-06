import Properties from "config/properties";
import useCarousel from "hooks/useCarousel";
import React, { useCallback } from "react";
import { MoviePreview } from "../@types/models/movie";
import MoviePreviewBanner from "./banner/MoviePreviewBanner";

const { DEFAULT_CAROUSEL_INTERVAL_SECONDS: defaultCarouselInterval } =
  Properties;

type OwnProps = {
  movies: MoviePreview[];
  interval?: number;
} & Pick<
  React.ComponentProps<typeof MoviePreviewBanner>,
  "height" | "backgroundOpacity"
>;

type MovieCarouselProps = OwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof OwnProps>;

/**
 * This Carousel cycle through a list of movie, using a fade effect as a transition animation.
 */
const MovieCarousel = ({
  movies,
  interval = defaultCarouselInterval,
  height,
  backgroundOpacity,
  className = "",
  ...rest
}: MovieCarouselProps) => {
  const {
    currentIndex,
    nextItem: nextMovie,
    prevItem: prevMovie,
    resetInterval: resetCarouselInterval,
  } = useCarousel(movies, interval);

  const handleRightArrowClick = useCallback(() => {
    nextMovie();
    resetCarouselInterval();
  }, [nextMovie, resetCarouselInterval]);

  const handleLeftArrowClick = useCallback(() => {
    prevMovie();
    resetCarouselInterval();
  }, [resetCarouselInterval, prevMovie]);

  return (
    <div className={`flex ${className}`} {...rest}>
      {movies.map((movie, index) => {
        const showMovieBanner = index === currentIndex;
        return (
          showMovieBanner && (
            <div key={movie.id} className="flex-1">
              <MoviePreviewBanner
                bannerMovie={movie}
                onLeftClick={handleLeftArrowClick}
                onRightClick={handleRightArrowClick}
                height={height}
                backgroundOpacity={backgroundOpacity}
              />
            </div>
          )
        );
      })}
    </div>
  );
};

export default MovieCarousel;
