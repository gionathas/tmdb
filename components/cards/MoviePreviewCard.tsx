import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { generateImageUrlByPathOrDefault } from "../../lib/api/image-api";
import { MoviePreview } from "../../@types/models/movie";
import PlayButton from "../miscellaneous/PlayButton";
import VoteBadge from "../miscellaneous/VoteBadge";
import { Genre } from "../../@types/models/genre";

export type size = "md" | "lg";

const MoviePreviewCard = ({
  movie,
  genresMap,
  genresToShow = 2,
  size = "lg",
}: {
  movie: MoviePreview;
  genresMap: Genre[];
  genresToShow?: number;
  size?: size;
}) => {
  const router = useRouter();
  const { id, title, vote_average, poster_path, genre_ids } = movie;
  const posterImageSrc = generateImageUrlByPathOrDefault(poster_path, null);

  const handleClick = () => {
    router.push(`/movies/${id}`);
  };

  const movieGenres = useMemo(
    () => getMovieGenresFromIds(genre_ids, genresMap).slice(0, genresToShow),
    [genre_ids, genresMap, genresToShow]
  );

  return (
    <div className="space-y-2 cursor-pointer" onClick={handleClick}>
      <Thumbnail
        cardSize={size}
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
  cardSize,
  thumbnailSrc,
}: {
  thumbnailSrc: MoviePreview["poster_path"];
  title: MoviePreview["title"];
  vote: MoviePreview["vote_average"];
  cardSize: size;
}) => {
  const thumbNailSize = classNames(
    { "w-56 h-80": cardSize === "lg" },
    { "w-48 h-64": cardSize === "md" }
  );

  return (
    <div
      className={`${thumbNailSize} relative overflow-hidden rounded-lg group transition-all duration-500`}
    >
      <img
        className="object-cover w-full h-full transition-all duration-500 group-hover:opacity-60"
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
