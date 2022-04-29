import classNames from "classnames";
import Properties from "config/properties";
import useCarousel from "hooks/useCarousel";
import { MoviePreview } from "../@types/models/movie";
import MoviePreviewBanner from "./banner/MoviePreviewBanner";

const { carouselIntervalMillis: defaultCarouselInterval } = Properties;

type Props = {
  movies: MoviePreview[];
  height: number;
  interval?: number;
};

/**
 * This Carousel cycle through a list of movie, using a fade effect as a transition animation.
 */
const MovieCarousel = ({
  movies,
  height,
  interval = defaultCarouselInterval,
}: Props) => {
  const {
    currentIndex,
    nextItem: nextMovie,
    prevItem: prevMovie,
  } = useCarousel(movies, interval);

  return (
    <div className="flex">
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
