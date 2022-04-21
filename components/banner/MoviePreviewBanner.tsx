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
    const movieId = bannerMovie.id;
    router.push(`/movies/${movieId}`);
  };

  const navigationArrowStyle =
    "fill-gray-300/80 hover:bg-gray-400/20 p-3 rounded-md transition-colors duration-150";

  const { title, original_title, overview } = bannerMovie;
  const genresListString = genres.join(", ");
  const movieYear = new Date(bannerMovie.release_date).getFullYear();

  return (
    <MovieBanner
      style={style}
      className={`${className}`}
      backgroundOpacity={0.5}
      height={height}
      backdropImageSrc={generateImageUrlByPathOrDefault(
        bannerMovie.backdrop_path,
        null
      )}
    >
      <div className="flex flex-col justify-center h-full">
        <div className="flex items-center mx-4">
          <ArrowButton
            direction={"left"}
            variant="xl"
            className={navigationArrowStyle}
            onClick={onLeftClick}
          />
          <div
            className="max-w-xl pl-5 cursor-pointer"
            onClick={goToMovieDetail}
          >
            <h2 className="text-6xl font-semibold title">
              {title || original_title}
            </h2>
            <span className="text-sm font-light text-gray-50/70">
              {movieYear}
            </span>
            <p className="mt-4 tracking-wide text-gray-200 line-clamp-3">
              {overview}
            </p>
            <p className="mt-2 text-sm tracking-wider capitalize text-primary-500">
              {genresListString}
            </p>
          </div>
          <ArrowButton
            direction={"right"}
            variant="xl"
            className={`ml-auto ${navigationArrowStyle}`}
            onClick={onRightClick}
          />
        </div>
      </div>
    </MovieBanner>
  );
};

export default MoviePreviewBanner;
