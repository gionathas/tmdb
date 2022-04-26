import classNames from "classnames";
import VoteBadge from "components/miscellaneous/VoteBadge";
import useMovieGenres from "hooks/useMovieGenres";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import { shimmerEffect } from "lib/effects";
import { toBase64 } from "lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Genre } from "../../@types/models/genre";
import { MoviePreview } from "../../@types/models/movie";

export type variant = "base" | "16:9";
export type size = "sm" | "md" | "lg";
export type style = `${variant}_${size}`;

const MovieCard = ({
  movie,
  genresMap,
  genresToShow = 2,
  size = "lg",
  variant = "base",
  showVote = false,
}: {
  movie: MoviePreview;
  genresMap: Genre[];
  genresToShow?: number;
  size?: size;
  variant?: variant;
  showVote?: boolean;
}) => {
  const router = useRouter();
  const { genres } = useMovieGenres(movie, genresMap, genresToShow);

  const handleCardClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  const { title, vote_average, poster_path, original_title } = movie;
  const displayTitle = title || original_title;
  const posterImageSrc = generateImageUrlByPathOrDefault(poster_path, null);

  return (
    <div
      className={`flex flex-col max-w-min space-y-2 transition-transform duration-500 cursor-pointer hover:scale-[1.01]`}
      onClick={handleCardClick}
    >
      <Thumbnail
        style={`${variant}_${size}`}
        vote={vote_average}
        thumbnailSrc={posterImageSrc}
        showVote={showVote}
      />
      <PreviewInfo cardSize={size} genres={genres} title={displayTitle} />
    </div>
  );
};

/**
 *
 * It render the thumbnail poster image of the movie
 */
const Thumbnail = ({
  vote,
  thumbnailSrc,
  style = "base_md",
  showVote,
}: {
  thumbnailSrc: string | null;
  vote: number;
  style?: style;
  showVote: boolean;
}) => {
  const thumbnailSize = classNames(
    { "w-56 h-80": style === "base_lg" },
    { "w-48 h-64": style === "base_md" },
    { "w-40 h-60": style === "base_sm" },
    { "w-96 h-56": style === "16:9_lg" },
    { "w-80 h-48": style === "16:9_md" },
    { "w-72 h-40": style === "16:9_sm" }
  );

  return (
    <div
      className={`${thumbnailSize} relative overflow-hidden rounded-lg group transition-all duration-500`}
    >
      {thumbnailSrc && (
        <Image
          src={thumbnailSrc}
          objectFit="cover"
          alt="Movie Thumbnail"
          objectPosition="center 13%"
          className="transition-opacity duration-500 group-hover:opacity-60"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmerEffect(700, 475)
          )}`}
          layout="fill"
        />
      )}

      {showVote && (
        <div className="absolute top-4 left-4">
          <VoteBadge vote={vote} size="sm" />
        </div>
      )}
    </div>
  );
};

/**
 *
 * It render the movie information (title, genres) below the thumbnail
 */
const PreviewInfo = ({
  title,
  genres,
  cardSize,
}: {
  cardSize: size;
  title: string;
  genres?: string[];
}) => {
  const titleSize = classNames(
    { "text-2xl": cardSize === "lg" },
    { "text-xl": cardSize === "md" },
    { "text-lg 2xl:text-xl": cardSize === "sm" }
  );

  const genresAsString = genres && <>{genres.join(", ")}</>;

  return (
    <div className="">
      <h2 className={`title ${titleSize} text-gray-100 text-small"`}>
        {title}
      </h2>
      <p
        className={`mt-0.5 text-xs font-light text-primary-400 tracking-widest capitalize`}
      >
        {genresAsString}
      </p>
    </div>
  );
};

export default MovieCard;
