import classNames from "classnames";
import Properties from "config/properties";
import useInterval from "hooks/useInterval";
import { useCallback, useState } from "react";
import { MoviePreview } from "../@types/models/movie";
import MoviePreviewBanner from "./banner/MoviePreviewBanner";

const { carouselIntervalMillis: carouselInterval } = Properties;

/**
 * This Carousel cycle around a list of movie, within a fade effect.
 */
const MovieCarousel = ({
  movies,
  height,
}: {
  movies: MoviePreview[];
  height: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMovie = useCallback(
    () => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= movies.length ? 0 : prevIndex + 1
      );
      resetInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [movies.length]
  );

  const prevMovie = useCallback(
    () => {
      setCurrentIndex((prevIndex) =>
        prevIndex - 1 < 0 ? movies.length - 1 : prevIndex - 1
      );
      resetInterval();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [movies.length]
  );

  const { resetInterval } = useInterval(nextMovie, carouselInterval);

  return (
    <div className="flex">
      {movies.map((movie, index) => {
        const showBanner = index === currentIndex;
        return (
          <div
            key={movie.id}
            className={classNames(
              "transition-opacity duration-700 ease-in-out",
              {
                "opacity-1 flex-1": showBanner,
                "opacity-0 flex-none": !showBanner,
              }
            )}
          >
            <MoviePreviewBanner
              className={classNames("w-full", {
                block: showBanner,
                hidden: !showBanner,
              })}
              height={height}
              bannerMovie={movie}
              onLeftClick={prevMovie}
              onRightClick={nextMovie}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MovieCarousel;
