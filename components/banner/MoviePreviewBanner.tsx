import classNames from "classnames";
import ArrowButton from "components/miscellaneous/buttons/ArrowButton";
import Properties from "config/properties";
import useGenres from "hooks/useGenres";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import { useRouter } from "next/router";
import React from "react";
import { MoviePreview } from "../../@types/models/movie";
import MovieBanner from "./MovieBanner";

const { DEFAULT_GENRES_TO_SHOW: defaultGenresToShowNumber } = Properties;

type Props = {
  bannerMovie: MoviePreview;
  genresToShow?: number;
  onRightClick?: () => void;
  onLeftClick?: () => void;
} & Omit<React.ComponentProps<typeof MovieBanner>, "backdropImageSrc">;

const MoviePreviewBanner = ({
  bannerMovie,
  genresToShow = defaultGenresToShowNumber,
  onLeftClick,
  onRightClick,
  ...rest
}: Props) => {
  const router = useRouter();
  const genres = useGenres(bannerMovie.genre_ids).slice(0, genresToShow);
  const {
    title: movieTitle,
    original_title: movieOriginalTitle,
    overview: movieOverview,
  } = bannerMovie;
  const genresListAsString = genres.join(", ");
  const movieYear = new Date(bannerMovie.release_date).getFullYear();
  const backdropImageSrc = generateImageUrlByPathOrDefault(
    bannerMovie.backdrop_path,
    null
  );

  const goToMovieDetail = () => {
    const { id: movieId } = bannerMovie;
    router.push(`/movies/${movieId}`);
  };

  const arrowClassName = classNames(
    "fill-gray-200 opacity-70 hover:opacity-100 transition-all rounded-md duration-150 hover:cursor-pointer"
  );
  const arrowVariant = "sm";

  const title = (
    <h2 className="text-4xl font-semibold md:text-5xl lg:text-6xl title">
      {movieTitle || movieOriginalTitle}
    </h2>
  );
  const year = (
    <span className="text-xs font-light md:text-sm xl:text-lg text-gray-50/70">
      {movieYear}
    </span>
  );

  const overview = (
    <p className="mt-4 text-sm tracking-wide text-gray-200 lg:text-base 2xl:text-lg line-clamp-3">
      {movieOverview}
    </p>
  );

  const genresList = (
    <p
      className={
        "mt-2 text-xs tracking-wider capitalize lg:text-sm 2xl:text-base text-primary-500 transition-opacity duration-150"
      }
    >
      {genresListAsString}
    </p>
  );

  return (
    <MovieBanner backdropImageSrc={backdropImageSrc} {...rest}>
      <div className="flex flex-col justify-center h-full">
        <div className="flex items-center md:mx-4">
          <ArrowButton
            direction={"left"}
            className={arrowClassName}
            onClick={onLeftClick}
            variant={arrowVariant}
          />
          <div
            className="max-w-md pl-5 cursor-pointer lg:max-w-xl"
            onClick={goToMovieDetail}
          >
            {title}
            {year}
            {overview}
            {genresList}
          </div>
          <ArrowButton
            direction={"right"}
            className={classNames("ml-auto", arrowClassName)}
            onClick={onRightClick}
            variant={arrowVariant}
          />
        </div>
      </div>
    </MovieBanner>
  );
};

export default MoviePreviewBanner;
