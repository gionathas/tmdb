import classNames from "classnames";
import Properties from "config/properties";
import useCarousel from "hooks/useCarousel";
import React from "react";
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

  const handleRightArrowClick = () => {
    nextMovie();
    resetCarouselInterval();
  };

  const handleLeftArrowClick = () => {
    prevMovie();
    resetCarouselInterval();
  };

  return (
    <div className={`flex ${className}`} {...rest}>
      {movies.map((movie, index) => {
        const showMovieBanner = index === currentIndex;
        return (
          <div
            key={movie.id}
            className={classNames(
              "transition-opacity duration-700 ease-in-out",
              {
                "opacity-1 flex-1": showMovieBanner,
                "opacity-0 flex-none": !showMovieBanner,
              }
            )}
          >
            <MoviePreviewBanner
              className={classNames("w-full", {
                block: showMovieBanner,
                hidden: !showMovieBanner,
              })}
              bannerMovie={movie}
              onLeftClick={handleLeftArrowClick}
              onRightClick={handleRightArrowClick}
              height={height}
              backgroundOpacity={backgroundOpacity}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieCarousel;
