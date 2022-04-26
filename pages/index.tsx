import Layout from "components/layout/Layout";
import { variant as ArrowVariant } from "components/miscellaneous/buttons/ArrowButton";
import MovieCarousel from "components/MovieCarousel";
import MovieSlideshow from "components/slideshows/MovieSlideshow";
import Properties from "config/properties";
import useMediaQuery from "hooks/useMediaQuery";
import { getAllGenres } from "lib/api/genre-api";
import { hasApiResponsesError } from "lib/api/helpers";
import { getMoviesByCategory, getTrendingMovies } from "lib/api/movie-api";
import _ from "lodash";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Genre } from "../@types/models/genre";
import { MoviePreview } from "../@types/models/movie";

const revalidationTime = Properties.indexPageRevalidationSeconds;

type Props = {
  popularMovies: MoviePreview[] | null;
  topRatedMovies: MoviePreview[] | null;
  trendingMovies: MoviePreview[] | null;
  nowPlayingMovies: MoviePreview[] | null;
  premiereMovies: MoviePreview[] | null;
  genresList: Genre[] | null;
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

  if (hasError) {
    throw new Error(
      `Error while generating index page! Page generation skipped!`
    );
  }

  const [
    { data: popularMovies },
    { data: topRatedMovies },
    { data: nowPlaying },
    { data: comingSoon },
    { data: trendingMovies },
    { data: genres },
  ] = requestedData;

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
    },
    revalidate: revalidationTime,
  };
};
const HomePage: NextPage<Props> = ({
  popularMovies,
  topRatedMovies,
  trendingMovies,
  nowPlayingMovies,
  premiereMovies,
  genresList,
}: Props) => {
  const isMdScreen = useMediaQuery("(min-width: 768px)");
  const isLgScreen = useMediaQuery("(min-width: 1024px)");
  const mainSlideshowCardSizes = isMdScreen ? "lg" : "md";
  const baseSlideShowCardSize = isMdScreen ? "md" : "sm";

  const arrowVariant: ArrowVariant = isLgScreen ? "base" : "sm";

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

        <div className="px-4 mt-8 space-y-2 md:mt-10">
          <MovieSlideshow
            movies={popularMovies!}
            className="mb-10"
            title="Popular Movies on TMDB"
            genresMap={genresList!}
            cardSize={mainSlideshowCardSizes}
            cardVariant="16:9"
            arrowVariant={arrowVariant}
          />
          <MovieSlideshow
            movies={trendingMovies!}
            title="Trending Now"
            genresMap={genresList!}
            cardSize={baseSlideShowCardSize}
            cardVariant="16:9"
            arrowVariant={arrowVariant}
          />
          <MovieSlideshow
            movies={nowPlayingMovies!}
            title="Now Playing "
            genresMap={genresList!}
            cardSize={baseSlideShowCardSize}
            cardVariant="16:9"
            arrowVariant={arrowVariant}
          />
          <MovieSlideshow
            movies={premiereMovies!}
            title="Premiere"
            genresMap={genresList!}
            cardSize={baseSlideShowCardSize}
            cardVariant="16:9"
            arrowVariant={arrowVariant}
          />
          <MovieSlideshow
            movies={topRatedMovies!}
            title="Top Rated ⭐️"
            genresMap={genresList!}
            cardSize={baseSlideShowCardSize}
            cardVariant="base"
            arrowVariant={arrowVariant}
            showVotes
          />
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
