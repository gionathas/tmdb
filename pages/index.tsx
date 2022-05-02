import { ArrowVariant } from "components/miscellaneous/buttons/ArrowButton";
import MovieCarousel from "components/MovieCarousel";
import MovieSlideshow from "components/slideshows/MovieSlideshow";
import Properties from "config/properties";
import useMediaQuery from "hooks/useMediaQuery";
import { hasApiResponsesError } from "lib/api/helpers";
import { getMoviesByCategory, getTrendingMovies } from "lib/api/movie-api";
import _ from "lodash";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { MoviePreview } from "../@types/models/movie";

const revalidationTime = Properties.indexPageRevalidationSeconds;

type Props = {
  popularMovies: MoviePreview[] | null;
  topRatedMovies: MoviePreview[] | null;
  trendingMovies: MoviePreview[] | null;
  nowPlayingMovies: MoviePreview[] | null;
  premiereMovies: MoviePreview[] | null;
};

// TODO: add constants to control the size of the movies to be shown for each category
export const getStaticProps: GetStaticProps<Props> = async () => {
  console.info("Generating Index Page..");

  //fetching data from tmdb api
  const requestedData = await Promise.all([
    getMoviesByCategory("popular"),
    getMoviesByCategory("top_rated"),
    getMoviesByCategory("now_playing"),
    getMoviesByCategory("upcoming"),
    getTrendingMovies(),
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
      <MovieCarousel
        height={700}
        backgroundOpacity={0.5}
        movies={popularMovies!}
      />

      <div className="px-4 mt-8 space-y-2 md:mt-10">
        <MovieSlideshow
          movies={popularMovies!}
          className="mb-10"
          title="Popular Movies on TMDB"
          cardSize={mainSlideshowCardSizes}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={trendingMovies!}
          title="Trending Now"
          cardSize={baseSlideShowCardSize}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={nowPlayingMovies!}
          title="Now Playing "
          cardSize={baseSlideShowCardSize}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={premiereMovies!}
          title="Premiere"
          cardSize={baseSlideShowCardSize}
          cardVariant="16:9"
          arrowVariant={arrowVariant}
        />
        <MovieSlideshow
          movies={topRatedMovies!}
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
