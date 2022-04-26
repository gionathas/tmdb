import Properties from "config/properties";
import useInterval from "hooks/useInterval";
import { useCallback, useState } from "react";
import { Genre } from "../@types/models/genre";
import { MoviePreview } from "../@types/models/movie";
import MoviePreviewBanner from "./banner/MoviePreviewBanner";

const { carouselIntervalMillis: carouselInterval } = Properties;

/**
 * This Carousel cycle around a list of movie, within a fade effect.
 */
const MovieCarousel = ({
  movies,
  genresMap,
  height,
}: {
  movies: MoviePreview[];
  genresMap: Genre[];
  height: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMovie = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= movies.length ? 0 : prevIndex + 1
    );
    resetInterval();
  }, [movies.length]);

  const prevMovie = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? movies.length - 1 : prevIndex - 1
    );
    resetInterval();
  }, [movies.length]);

  const { resetInterval } = useInterval(nextMovie, carouselInterval);

  return (
    <div className="flex">
      {movies.map((movie, index) => {
        const show = index === currentIndex;
        const fadeEffect = show ? "opacity-1 flex-1" : "opacity-0 flex-none";
        return (
          <div
            key={movie.id}
            className={`transition-opacity duration-700 ease-in-out ${fadeEffect}`}
          >
            {show && (
              <MoviePreviewBanner
                className="w-full"
                height={height}
                bannerMovie={movie}
                genresMap={genresMap}
                onLeftClick={prevMovie}
                onRightClick={nextMovie}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MovieCarousel;
