import Layout from "components/layout/Layout";
import MovieCarousel from "components/MovieCarousel";
import MoviePreviewSlideshow from "components/slideshows/MoviePreviewsSlideshow";
import { getAllGenres } from "lib/api/genre-api";
import { hasApiResponsesError } from "lib/api/helpers";
import { getMoviesByCategory, getTrendingMovies } from "lib/api/movie-api";
import _ from "lodash";
import type { GetStaticProps, NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import { Genre } from "../@types/models/genre";
import { MoviePreview } from "../@types/models/movie";

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
        <MovieCarousel
          height={700}
          movies={popularMovies!}
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

export default HomePage;
