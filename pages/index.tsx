import _ from "lodash";
import type { GetStaticProps, NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { Genre } from "../@types/models/genre";
import { MoviePreview } from "../@types/models/movie";
import Layout from "components/layout/Layout";
import MovieBanner from "components/MovieBanner";
import MoviePreviewSlideshow from "components/slideshows/MoviePreviewsSlideshow";
import useMovieGenres from "hooks/useMovieGenres";
import { getAllGenres } from "lib/api/genre-api";
import { hasApiResponsesError } from "lib/api/helpers";
import { generateImageUrlByPathOrDefault } from "lib/api/image-api";
import { getMoviesByCategory, getTrendingMovies } from "lib/api/movie-api";

type Props = {
  popularMovies: MoviePreview[] | null;
  topRatedMovies: MoviePreview[] | null;
  trendingMovies: MoviePreview[] | null;
  nowPlayingMovies: MoviePreview[] | null;
  premiereMovies: MoviePreview[] | null;
  genresList: Genre[] | null;
  hasError: boolean;
};

// TODO: add constants to control the size of the movies to be shown for each category
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  console.info("Generating Index Page..");

  //fetching data from tmdb api
  const requestedData = await Promise.all([
    getMoviesByCategory("popular"),
    getMoviesByCategory("top_rated"),
    getMoviesByCategory("now_playing"),
    getMoviesByCategory("upcoming"),
    getTrendingMovies(),
    getAllGenres(),
  ]);

  const hasError = hasApiResponsesError(...requestedData);
  const [
    { data: popularMovies },
    { data: topRatedMovies },
    { data: nowPlaying },
    { data: comingSoon },
    { data: trendingMovies },
    { data: genres },
  ] = requestedData;

  // FIXME: the shuffle function can be removed because the page is statically rendered so it will be executed only once at build time
  return {
    props: {
      popularMovies:
        (popularMovies && _.shuffle(popularMovies.results)) || null,
      topRatedMovies:
        (topRatedMovies && _.shuffle(topRatedMovies.results)) || null,
      trendingMovies:
        (trendingMovies && _.shuffle(trendingMovies.results)) || null,
      nowPlayingMovies: (nowPlaying && _.shuffle(nowPlaying.results)) || null,
      premiereMovies: (comingSoon && _.shuffle(comingSoon.results)) || null,
      genresList: genres || null,
      hasError,
    },
  };
};
const HomePage: NextPage<Props> = ({
  popularMovies,
  topRatedMovies,
  trendingMovies,
  nowPlayingMovies,
  premiereMovies,
  genresList,
  hasError,
}: Props) => {
  if (hasError) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <Head>
        <title>TMDB</title>
      </Head>
      <Layout>
        <SelectedMovieBanner
          bannerMovie={popularMovies?.at(0)!}
          genresMap={genresList!}
        />

        <div className="mt-10 space-y-2">
          <MoviePreviewSlideshow
            movies={popularMovies!}
            title="Popular Movies on TMDB"
            genresMap={genresList!}
            cardSize="lg"
            variant="16:9"
          />
          <MoviePreviewSlideshow
            movies={trendingMovies!}
            title="Trending Now"
            genresMap={genresList!}
            cardSize="md"
            variant="16:9"
          />
          <MoviePreviewSlideshow
            movies={nowPlayingMovies!}
            title="Now Playing "
            genresMap={genresList!}
            cardSize="md"
            variant="16:9"
          />
          <MoviePreviewSlideshow
            movies={premiereMovies!}
            title="Premiere"
            genresMap={genresList!}
            cardSize="md"
            variant="16:9"
          />
          <MoviePreviewSlideshow
            movies={topRatedMovies!}
            title="Top Rated ⭐️"
            genresMap={genresList!}
            cardSize="md"
            showVotes
          />
        </div>
      </Layout>
    </>
  );
};

// TODO: move it inside a dedicated file compoennt
const SelectedMovieBanner = ({
  bannerMovie,
  genresMap,
}: {
  bannerMovie: MoviePreview;
  genresMap: Genre[];
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
      opacity={0.5}
      height={600}
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

export default HomePage;
