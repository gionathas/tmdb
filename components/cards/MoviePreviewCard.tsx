import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { generateImageUrlByPathOrDefault } from "../../lib/api/image-api";
import { MoviePreview } from "../../@types/models/movie";
import VoteBadge from "../miscellaneous/VoteBadge";
import { Genre } from "../../@types/models/genre";
import PlayButton from "../miscellaneous/buttons/PlayButton";

export type variant = "base" | "16:9";
export type size = "md" | "lg";
export type style = `${variant}_${size}`;

const MoviePreviewCard = ({
  movie,
  genresMap,
  genresToShow = 2,
  size = "lg",
  variant = "base",
}: {
  movie: MoviePreview;
  genresMap: Genre[];
  genresToShow?: number;
  size?: size;
  variant?: variant;
}) => {
  const router = useRouter();
  const { id, title, vote_average, poster_path, genre_ids } = movie;
  const posterImageSrc = generateImageUrlByPathOrDefault(poster_path, null);

  const handleCardClick = () => {
    router.push(`/movies/${id}`);
  };

  const movieGenres = useMemo(
    () => getMovieGenresFromIds(genre_ids, genresMap).slice(0, genresToShow),
    [genre_ids, genresMap, genresToShow]
  );

  return (
    <div
      className="space-y-2 transition-transform duration-500 cursor-pointer hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      <Thumbnail
        style={`${variant}_${size}`}
        title={title}
        vote={vote_average}
        thumbnailSrc={posterImageSrc}
      />
      <PreviewInfo cardSize={size} genres={movieGenres} title={title} />
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
}: {
  thumbnailSrc: MoviePreview["poster_path"];
  title: MoviePreview["title"];
  vote: MoviePreview["vote_average"];
  style?: style;
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
      <img
        className="object-cover w-full h-full transition-all duration-500 object-center-top group-hover:opacity-60"
        src={thumbnailSrc}
        alt={title}
      />
      {/* Upper left vote badge */}
      <div className="absolute top-4 left-4">
        <VoteBadge vote={vote} size="sm" />
      </div>
      {/* Center Play Button */}
      <div
        className={
          "opacity-0 absolute top-0 left-0 w-full h-full group-hover:grid group-hover:opacity-100 transition-all duration-300"
        }
      >
        <PlayButton />
      </div>
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

/**
 * @param movieGenreIds list of genres id to map
 * @param genresMap a map where the key is the genred id and the value is the genre name
 * @returns the list of the genres names mapped by their respective ids
 */
const getMovieGenresFromIds = (
  movieGenreIds: number[],
  genresMap: Genre[]
): string[] => {
  return movieGenreIds
    .map((genre_id) => {
      const genre = genresMap.find(({ id }) => id === genre_id);
      return genre && genre.name;
    })
    .filter((genre_name): genre_name is string => {
      return typeof genre_name === "string";
    });
};

export default MoviePreviewCard;
