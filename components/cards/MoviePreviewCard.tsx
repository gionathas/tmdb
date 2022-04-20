import classNames from "classnames";
import React from "react";
import { Genre } from "../../@types/models/genre";
import { MoviePreview } from "../../@types/models/movie";
import useMovieGenres from "hooks/useMovieGenres";
import { generateImageUrlByPathOrDefault } from "lib/api/image-api";
import VoteBadge from "components/miscellaneous/VoteBadge";
import { useRouter } from "next/router";
import Image from "next/image";
import { shimmerEffect } from "lib/effects";
import { toBase64 } from "lib/utils";

export type variant = "base" | "16:9";
export type size = "md" | "lg";
export type style = `${variant}_${size}`;

const MoviePreviewCard = ({
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
  const { title, vote_average, poster_path, original_title } = movie;
  const displayTitle = title || original_title;
  const posterImageSrc = generateImageUrlByPathOrDefault(poster_path, null);

  const { genres } = useMovieGenres(movie, genresMap, genresToShow);

  const handleClick = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div
      className={`space-y-2 transition-transform duration-500 cursor-pointer hover:scale-[1.02]`}
      onClick={handleClick}
    >
      <Thumbnail
        style={`${variant}_${size}`}
        title={displayTitle}
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
  title,
  vote,
  thumbnailSrc,
  style = "base_md",
  showVote,
}: {
  thumbnailSrc: string | null;
  title: string;
  vote: number;
  style?: style;
  showVote: boolean;
}) => {
  const thumbnailSize = classNames(
    { "w-56 h-80": style === "base_lg" },
    { "w-48 h-64": style === "base_md" },
    { "w-80 h-48": style === "16:9_md" },
    { "w-96 h-56": style === "16:9_lg" }
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
          objectPosition="center 10%"
          className="transition-opacity duration-500 group-hover:opacity-60"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmerEffect(700, 475)
          )}`}
          layout="fill"
        />
      )}

      {/* <img
        className="object-cover w-full h-full transition-all duration-500 object-center-top group-hover:opacity-60"
        src={thumbnailSrc}
        alt={title}
      /> */}
      {/* Upper left vote badge */}
      {showVote && (
        <div className="absolute top-4 left-4">
          <VoteBadge vote={vote} size="sm" />
        </div>
      )}

      {/* Center Play Button */}
      {/* <div
        className={
          "opacity-0 absolute top-0 left-0 w-full h-full group-hover:grid group-hover:opacity-100 transition-all duration-300"
        }
      >
        <PlayButton />
      </div> */}
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
    { "text-xl": cardSize === "md" }
  );

  const renderGenres = (genres: string[]) => {
    const genresList = genres.join(", ");
    return <span className="tracking-widest capitalize">{genresList}</span>;
  };

  return (
    <div id="movie-info">
      <h2 className={`title ${titleSize} text-gray-100 text-small`}>{title}</h2>
      {genres && (
        <p className={`mt-0.5 text-xs font-light text-primary-400`}>
          {renderGenres(genres)}
        </p>
      )}
    </div>
  );
};

export default MoviePreviewCard;
