import { ArrowVariant } from "components/buttons/ArrowButton";
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
import { MoviePreview } from "../@types/models/movie";
import { SharedPageProps } from "./_app";

const { DEFAULT_INDEX_PAGE_REVALIDATION_SECONDS } = Properties;

type PageProps = SharedPageProps & {
  popularMovies: MoviePreview[];
  topRatedMovies: MoviePreview[];
  trendingMovies: MoviePreview[];
  nowPlayingMovies: MoviePreview[];
  premiereMovies: MoviePreview[];
};

// TODO: add constants to control the size of the movies to be shown for each category
export const getStaticProps: GetStaticProps<PageProps> = async () => {
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
    { data: genresMap },
  ] = requestedData;

  return {
    props: {
      popularMovies: _.shuffle(popularMovies?.results),
      topRatedMovies: _.shuffle(topRatedMovies?.results),
      trendingMovies: _.shuffle(trendingMovies?.results),
      nowPlayingMovies: _.shuffle(nowPlaying?.results),
      premiereMovies: _.shuffle(comingSoon?.results),
      genresMap: genresMap!,
    },
    revalidate: DEFAULT_INDEX_PAGE_REVALIDATION_SECONDS,
  };
};
const HomePage: NextPage<PageProps> = ({
  popularMovies,
  topRatedMovies,
  trendingMovies,
  nowPlayingMovies,
  premiereMovies,
}: PageProps) => {
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
      <MovieCarousel
        height={700}
        backgroundOpacity={0.5}
        movies={popularMovies}
      />

      <div className="px-4 mt-8 space-y-2 md:mt-10">
        <MovieSlideshow
          movies={popularMovies}
          className="mb-10"
          title="Popular Movies on TMDB"
          cardSize={mainSlideshowCardSizes}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={trendingMovies}
          title="Trending Now"
          cardSize={baseSlideShowCardSize}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={nowPlayingMovies}
          title="Now Playing "
          cardSize={baseSlideShowCardSize}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={premiereMovies}
          title="Premiere"
          cardSize={baseSlideShowCardSize}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={topRatedMovies}
          title="Top Rated ⭐️"
          cardSize={baseSlideShowCardSize}
          cardVariant="base"
          arrowVariant={arrowVariant}
          showVotes
        />
      </div>
    </>
  );
};

export default HomePage;
