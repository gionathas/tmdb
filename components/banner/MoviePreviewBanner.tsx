import { Genre } from "../../@types/models/genre";
import { MoviePreview } from "../../@types/models/movie";
import useMovieGenres from "hooks/useMovieGenres";
import { generateImageUrlByPathOrDefault } from "lib/api/image-api";
import { useRouter } from "next/router";
import MovieBanner from "./MovieBanner";

const MoviePreviewBanner = ({
  bannerMovie,
  genresMap,
  height,
  className = "",
  style = {},
}: {
  bannerMovie: MoviePreview;
  genresMap: Genre[];
  height: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const router = useRouter();
  const { genres } = useMovieGenres(bannerMovie, genresMap, 3);

  const watchDetailHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const movieId = bannerMovie.id;
    router.push(`/movies/${movieId}`);
  };

  return (
    <MovieBanner
      style={style}
      className={className}
      backgroundOpacity={0.5}
      height={height}
      backdropImageSrc={generateImageUrlByPathOrDefault(
        bannerMovie.backdrop_path,
        null
      )}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="max-w-xl pl-10">
          <h2 className="text-6xl font-semibold title">
            {bannerMovie.title || bannerMovie.original_title}
          </h2>
          <div className="flex items-baseline space-x-4 ">
            <button
              onClick={(e) => watchDetailHandler(e)}
              className="px-4 py-2 mt-4 bg-gray-500/60 btn"
            >
              Watch Detail
            </button>
            <button className="px-4 py-2 mt-4 bg-gray-500/60 btn">
              Play Trailer
            </button>
          </div>
          <p className="mt-4 tracking-wide text-gray-100 line-clamp-3">
            {bannerMovie.overview}
          </p>
          <p className="mt-2 text-sm tracking-wider capitalize text-primary-500">
            {genres.join(", ")}
          </p>
        </div>
      </div>
    </MovieBanner>
  );
};

export default MoviePreviewBanner;
