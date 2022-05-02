import classNames from "classnames";
import MovieBanner from "components/banner/MovieBanner";
import ActionButton from "components/miscellaneous/buttons/ActionButton";
import VoteBadge from "components/miscellaneous/VoteBadge";
import useImageLoad from "hooks/useImageLoad";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import { shimmerEffect } from "lib/effects";
import { toBase64 } from "lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { CrewCredit } from "../../@types/models/credit";
import { MovieDetail } from "../../@types/models/movie";

type Props = {
  movie: MovieDetail;
  crew: CrewCredit[];
  onPlayTrailer?: () => void;
  showPlayTrailer: boolean;
} & Pick<
  React.ComponentProps<typeof MovieBanner>,
  "backgroundOpacity" | "height"
>;

const MovieDetailBanner = ({
  movie,
  crew,
  onPlayTrailer: handlePlayTrailer,
  showPlayTrailer = false,
  ...rest
}: Props) => {
  const { backdrop_path, poster_path } = movie;
  const [isPosterLoading, setIsPosterLoading] = useState(
    poster_path ? true : false
  );

  const handlePosterImageLoadingComplete = () => {
    setIsPosterLoading(false);
  };

  return (
    <MovieBanner
      key={movie.id}
      backdropImageSrc={generateImageUrlByPathOrDefault(backdrop_path, null)}
      isContentLoading={isPosterLoading}
      {...rest}
    >
      <div className="flex flex-col justify-center h-full base-padding">
        <div className="lg:flex lg:space-x-8 2xl:pt-12">
          <MoviePosterImage
            className={`hidden lg:block relative flex-none w-[350px] h-[500px] xl:w-[400px] 2xl:w-[440px] 2xl:h-[550px] rounded overflow-hidden transition-opacity duration-300`}
            posterSrc={generateImageUrlByPathOrDefault(poster_path, null)}
            onLoadingComplete={handlePosterImageLoadingComplete}
          />
          <MovieInformation
            className="w-full max-w-4xl mx-auto lg:pt-5 lg:flex-1 2xl:pt-2"
            movie={movie}
            crew={crew}
            onPlayTrailer={handlePlayTrailer}
            showPlayTrailer={showPlayTrailer}
          />
        </div>
      </div>
    </MovieBanner>
  );
};

const MoviePosterImage = ({
  posterSrc,
  onLoadingComplete,
  className,
}: {
  posterSrc: string | null;
  onLoadingComplete: () => void;
  className?: string;
}) => {
  const {
    isLoading: isPosterLoading,
    handleLoadingComplete: handlePosterLoadingComplete,
  } = useImageLoad(posterSrc);

  const handleLoadingComplete = () => {
    handlePosterLoadingComplete();
    onLoadingComplete();
  };

  return (
    <div
      className={classNames(className, {
        "opacity-0": isPosterLoading,
        "opacity-100": !isPosterLoading,
      })}
    >
      {posterSrc && (
        <Image
          src={posterSrc}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmerEffect(700, 475)
          )}`}
          alt="Movie Poster Image"
          onLoadingComplete={handleLoadingComplete}
          priority
        />
      )}
    </div>
  );
};

const MovieInformation = ({
  movie,
  crew,
  onPlayTrailer: handlePlayTrailer,
  showPlayTrailer,
  className = "",
}: {
  movie: MovieDetail;
  crew: CrewCredit[];
  onPlayTrailer?: () => void;
  showPlayTrailer: boolean;
  className?: string;
}) => {
  const { vote_average: vote } = movie;
  return (
    <div className={className}>
      <MovieInformationHeader movie={movie} />
      <MovieInformationSubHeader
        className="flex flex-wrap items-center mt-7 gap-x-4 gap-y-5"
        vote={vote}
        onPlayTrailer={handlePlayTrailer}
        showPlayTrailer={showPlayTrailer}
      />
      <MovieInformationOverview className="mt-6" movie={movie} crew={crew} />
    </div>
  );
};

/**
 * It renders: Title, Year, Release Date, Country, Genres, Duration
 */
const MovieInformationHeader = ({
  movie,
  className = "",
}: {
  movie: MovieDetail;
  className?: string;
}) => {
  const {
    title,
    release_date,
    original_title,
    production_countries: countries,
    genres,
    runtime,
  } = movie;
  const displayTitle = title || original_title;
  const releaseDate = new Date(release_date);
  const releaseDateAsString = releaseDate.toLocaleDateString();
  const movieYear = releaseDate.getFullYear();
  const mainProductionCountryString =
    countries.length > 0 && countries[0].iso_3166_1;
  const movieGenresAsString: String = genres.map((gn) => gn.name).join(", ");

  return (
    <div className={className}>
      {/* Title + Year */}
      <h2 className="text-3xl 2xl:text-4xl">
        <span className="font-semibold title">{displayTitle}</span>
        <span className="ml-2 text-gray-300 uppercase">({movieYear})</span>
      </h2>

      {/* Release Date + Country + Genres + Duration */}
      <div className="flex flex-wrap mt-2 text-xs font-light text-gray-200 gap-y-1 sm:text-sm sm:mt-1 gap-x-2 2xl:text-base">
        <span>{releaseDateAsString}</span>
        {mainProductionCountryString && (
          <span>({mainProductionCountryString})</span>
        )}
        <span className="capitalize">&#9702; {movieGenresAsString}</span>
        {runtime && <span>&#9702; {runtime}min</span>}
      </div>
    </div>
  );
};

/**
 * It renders the Vote Score and the main action buttons (Rate, Play Tailer, Add to Watchlist,ecc..)
 */
const MovieInformationSubHeader = ({
  vote,
  onPlayTrailer: handlePlayTrailer = () => void 0,
  showPlayTrailer,
  className = "",
}: {
  vote: number;
  onPlayTrailer?: () => void;
  showPlayTrailer: boolean;
  className?: string;
}) => {
  return (
    <div className={className}>
      {/* Vote Score */}
      <div className="flex items-center space-x-2">
        <VoteBadge vote={vote} size="lg" />
        <span className="text-sm font-medium 2xl:text-base">
          Vote <br /> Score
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <ActionButton
          content={<span className="2xl:text-lg">&#9781;</span>}
          tooltip="Add to watchlist"
        />
        <ActionButton
          content={<span className="2xl:text-lg">&#10029;</span>}
          tooltip="Rate it!"
        />
        <ActionButton
          content={<span className="2xl:text-lg">&#9873;</span>}
          tooltip="Report"
        />
        <ActionButton
          tooltip="Mark as favourite"
          content={<span className="text-[11px]">&#9829;</span>}
        />
      </div>

      {/* Play Trailer Button */}
      {showPlayTrailer && (
        <div className="flex items-center font-medium tracking-wide transition-colors duration-300 cursor-pointer group 2xl:text-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-gray-50 group-hover:fill-gray-300"
            viewBox="0 0 24 24"
          >
            <path d="M3 22v-20l18 10-18 10z" />
          </svg>

          <span
            onClick={handlePlayTrailer}
            className="ml-2 min-w-max group-hover:text-gray-300"
          >
            Play Trailer
          </span>
        </div>
      )}
    </div>
  );
};

/**
 *
 * @description It renders: tagline, movie description and a grid with the main crew staff
 * @returns
 */
const MovieInformationOverview = ({
  movie,
  crew,
  className = "",
}: {
  movie: MovieDetail;
  crew: CrewCredit[];
  className?: string;
}) => {
  const { overview, tagline } = movie;

  const movieCrewList = crew.map((crew, index) => (
    <div key={index} className="text-sm">
      <h2 className="font-semibold name 2xl:text-lg">{crew.name}</h2>
      <div className="text-xs 2xl:text-sm">{crew.job}</div>
    </div>
  ));

  return (
    <div className={className}>
      {/* Tagline */}
      <div className="text-sm italic text-gray-400 sm:text-base 2xl:text-lg">
        {tagline}
      </div>

      {/* Overview */}
      <div className="mt-4">
        <h2 className="text-xl font-medium 2xl:text-2xl">Overview</h2>
        <p className="mt-1 text-sm leading-snug text-gray-300 2xl:text-base">
          {overview}
        </p>
      </div>

      {/* Crew Staff */}
      <div className="hidden grid-cols-2 mt-12 sm:grid sm:grid-cols-3 gap-y-6">
        {movieCrewList}
      </div>
    </div>
  );
};

export default MovieDetailBanner;
