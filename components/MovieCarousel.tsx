import { Genre } from "../@types/models/genre";
import { MoviePreview } from "../@types/models/movie";
import Properties from "config/properties";
import { useState } from "react";
import { useInterval } from "react-use";
import MoviePreviewBanner from "./banner/MoviePreviewBanner";

const MovieCarousel = ({
  movies,
  genresMap,
}: {
  movies: MoviePreview[];
  genresMap: Genre[];
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { carouselInterval } = Properties;

  useInterval(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= movies.length ? 0 : prevIndex + 1
    );
  }, carouselInterval);

  return (
    <div className="flex">
      {movies.map((movie, index) => {
        const show = index === currentIndex;
        const fadeEffect = show ? "opacity-1" : "opacity-0";
        return (
          <div
            key={movie.id}
            className={`overflow-hidden transition-opacity duration-700  ${fadeEffect}`}
          >
            {show && (
              <MoviePreviewBanner
                className="w-screen max-w-screen-2xl"
                height={700}
                bannerMovie={movie}
                genresMap={genresMap}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MovieCarousel;
