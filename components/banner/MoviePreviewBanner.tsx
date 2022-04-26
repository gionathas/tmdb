import ArrowButton from "components/miscellaneous/buttons/ArrowButton";
import useMovieGenres from "hooks/useMovieGenres";
import { generateImageUrlByPathOrDefault } from "lib/api/multimedia-api";
import { useRouter } from "next/router";
import { Genre } from "../../@types/models/genre";
import { MoviePreview } from "../../@types/models/movie";
import MovieBanner from "./MovieBanner";

const MoviePreviewBanner = ({
  bannerMovie,
  genresMap,
  height,
  className = "",
  style = {},
  onLeftClick,
  onRightClick,
}: {
  bannerMovie: MoviePreview;
  genresMap: Genre[];
  height: number;
  className?: string;
  style?: React.CSSProperties;
  onRightClick?: () => void;
  onLeftClick?: () => void;
}) => {
  const router = useRouter();
  const { genres } = useMovieGenres(bannerMovie, genresMap, 3);

  const goToMovieDetail = () => {
    const { id: movieId } = bannerMovie;
    router.push(`/movies/${movieId}`);
  };

  const navigationArrowStyle =
    "fill-gray-200 opacity-70 hover:opacity-100 transition-all rounded-md duration-150 hover:cursor-pointer";
  const arrowVariant = "sm";

  const { title, original_title, overview } = bannerMovie;
  const genresListAsString = genres.join(", ");
  const movieYear = new Date(bannerMovie.release_date).getFullYear();
  const backdropImageSrc = generateImageUrlByPathOrDefault(
    bannerMovie.backdrop_path,
    null
  );

  return (
    <MovieBanner
      style={style}
      className={className}
      backgroundOpacity={0.5}
      height={height}
      backdropImageSrc={backdropImageSrc}
    >
      <div className="flex flex-col justify-center h-full">
        <div className="flex items-center md:mx-4">
          <ArrowButton
            direction={"left"}
            className={navigationArrowStyle}
            onClick={onLeftClick}
            variant={arrowVariant}
          />
          <div
            className="max-w-md pl-5 cursor-pointer lg:max-w-xl"
            onClick={goToMovieDetail}
          >
            <h2 className="text-4xl font-semibold md:text-5xl lg:text-6xl title">
              {title || original_title}
            </h2>
            <span className="text-xs font-light md:text-sm xl:text-lg text-gray-50/70">
              {movieYear}
            </span>
            <p className="mt-4 text-sm tracking-wide text-gray-200 lg:text-base 2xl:text-lg line-clamp-3">
              {overview}
            </p>
            <p className="mt-2 text-xs tracking-wider capitalize lg:text-sm 2xl:text-base text-primary-500">
              {genresListAsString}
            </p>
          </div>
          <ArrowButton
            direction={"right"}
            className={`ml-auto ${navigationArrowStyle}`}
            onClick={onRightClick}
            variant={arrowVariant}
          />
        </div>
      </div>
    </MovieBanner>
  );
};

export default MoviePreviewBanner;
