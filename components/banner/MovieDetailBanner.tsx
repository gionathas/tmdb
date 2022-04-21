import MovieBanner from "components/banner/MovieBanner";
import ActionButton from "components/miscellaneous/buttons/ActionButton";
import VoteBadge from "components/miscellaneous/VoteBadge";
import useImageLoad from "hooks/useImageLoad";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import { shimmerEffect } from "lib/effects";
import { toBase64 } from "lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CrewCredit } from "../../@types/models/credit";
import { MovieDetail } from "../../@types/models/movie";

type OwnProps = {
  movie: MovieDetail;
  crew: CrewCredit[];
  height: number;
  backgroundOpacity: number;
  onPlayTrailer?: () => void;
  showPlayTrailer: boolean;
};

const MovieDetailBanner = ({
  movie,
  crew,
  height,
  backgroundOpacity,
  onPlayTrailer: handlePlayTrailer,
  showPlayTrailer = false,
}: OwnProps) => {
  const [isContentLoading, setIsContentLoading] = useState(true);

  useEffect(() => {
    setIsContentLoading(true);
  }, [movie]);

  const handleContentLoadingComplete = () => {
    setIsContentLoading(false);
  };

  const { backdrop_path, poster_path } = movie;
  const backgroundImageSrc = generateImageUrlByPathOrDefault(
    backdrop_path,
    null
  );
  const posterImageSrc = generateImageUrlByPathOrDefault(poster_path, null);

  const loadingClass = isContentLoading
    ? "animate-pulse blur-sm"
    : "animate-none blur-none";

  return (
    <MovieBanner
      className={loadingClass}
      backdropImageSrc={backgroundImageSrc}
      height={height}
      backgroundOpacity={backgroundOpacity}
    >
      <div className="flex flex-col justify-center h-full">
        <div className="flex py-12 pl-10 space-x-8 pr-36">
          <MoviePosterImage
            posterSrc={posterImageSrc}
            onLoadingComplete={handleContentLoadingComplete}
          />
          <MovieSideInformation
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
}: {
  posterSrc: string | null;
  onLoadingComplete: () => void;
}) => {
  const {
    isLoading: isPosterLoading,
    handleLoadingComplete: handlePosterLoadingComplete,
  } = useImageLoad(posterSrc);

  const handleLoadingComplete = () => {
    handlePosterLoadingComplete();
    onLoadingComplete();
  };

  const loadingClasses = isPosterLoading ? "opacity-0" : "opacity-1";

  return (
    <div
      className={`relative flex-none w-[350px] h-[500px] rounded overflow-hidden transition-opacity duration-300 ${loadingClasses}`}
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

const MovieSideInformation = ({
  movie,
  crew,
  onPlayTrailer: handlePlayTrailer,
  showPlayTrailer,
}: {
  movie: MovieDetail;
  crew: CrewCredit[];
  onPlayTrailer?: () => void;
  showPlayTrailer: boolean;
}) => {
  const { vote_average: vote } = movie;
  return (
    <div className="flex-1 pt-6">
      <MovieHeader movie={movie} />
      <MovieSubHeader
        vote={vote}
        onPlayTrailer={handlePlayTrailer}
        showPlayTrailer={showPlayTrailer}
      />
      <MovieOverview movie={movie} crew={crew} />
    </div>
  );
};

/**
 * It renders: Title, Year, Release Date, Country, Genres, Duration
 */
const MovieHeader = ({ movie }: { movie: MovieDetail }) => {
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
  const mainProductionCountryString: string =
    (countries.length > 0 && countries[0].iso_3166_1) || "";
  const movieGenresAsString: String = genres.map((gn) => gn.name).join(", ");

  return (
    <div>
      {/* Title + Year */}
      <h2 className="text-3xl">
        <span className="font-semibold title">{displayTitle}</span>
        <span className="ml-1.5 text-gray-300 uppercase">({movieYear})</span>
      </h2>

      {/* Release Date + Country + Genres + Duration */}
      <div className="flex mt-1 space-x-2 text-sm font-light text-gray-200">
        <span>{releaseDateAsString}</span>
        <div>({mainProductionCountryString})</div>
        <span>&#9702;</span>
        <span className="capitalize">{movieGenresAsString}</span>
        <span>&#9702;</span>
        {runtime && <span>{runtime}min</span>}
      </div>
    </div>
  );
};

/**
 * It renders the Vote Score and the main action buttons (Rate, Play Tailer, Add to Watchlist,ecc..)
 */
const MovieSubHeader = ({
  vote,
  onPlayTrailer: handlePlayTrailer = () => void 0,
  showPlayTrailer,
}: {
  vote: number;
  onPlayTrailer?: () => void;
  showPlayTrailer: boolean;
}) => {
  return (
    <div className="flex items-center mt-5 space-x-6">
      {/* Vote Score */}
      <div className="flex items-center space-x-2">
        <VoteBadge vote={vote} size="lg" />
        <span className="text-sm font-medium">
          Vote <br /> Score
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <ActionButton
          content={<span>&#9781;</span>}
          tooltip="Add to watchlist"
        />
        <ActionButton content={<span>&#10029;</span>} tooltip="Rate it!" />
        <ActionButton content={<span>&#9873;</span>} tooltip="Report" />
        <ActionButton
          tooltip="Mark as favourite"
          content={<span className="text-[11px]">&#9829;</span>}
        />
      </div>

      {/* Play Trailer Button */}
      <div className="flex font-medium tracking-wide transition-colors duration-300 cursor-pointer group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 fill-gray-50 group-hover:fill-gray-300"
          viewBox="0 0 24 24"
        >
          <path d="M3 22v-20l18 10-18 10z" />
        </svg>
        {showPlayTrailer && (
          <span
            onClick={handlePlayTrailer}
            className="ml-2 group-hover:text-gray-300"
          >
            Play Trailer
          </span>
        )}
      </div>
    </div>
  );
};

/**
 *
 * @description It renders: tagline, movie description and a grid with the main crew staff
 * @returns
 */
const MovieOverview = ({
  movie,
  crew,
}: {
  movie: MovieDetail;
  crew: CrewCredit[];
}) => {
  const { overview, tagline } = movie;

  const renderCrewCredit = () => {
    return crew.map((crew, index) => (
      <div key={index} className="text-sm">
        <h2 className="font-semibold name">{crew.name}</h2>
        <div className="text-xs">{crew.job}</div>
      </div>
    ));
  };

  return (
    <div className="mt-6">
      {/* Tagline */}
      <div className="italic text-gray-400 ">{tagline}</div>

      {/* Description */}
      <div className="mt-4">
        <h2 className="text-xl font-medium">Overview</h2>
        <p className="mt-1 text-sm leading-snug text-gray-300">{overview}</p>
      </div>

      {/* Crew Staff */}
      <div className="grid grid-cols-3 mt-12 gap-y-6">{renderCrewCredit()}</div>
    </div>
  );
};

export default MovieDetailBanner;
