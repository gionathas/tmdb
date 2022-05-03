import MovieReviewList from "components/lists/MovieReviewList";
import RecommendedMovieList from "components/lists/RecommendedMovieList";
import { ArrowVariant } from "components/miscellaneous/buttons/ArrowButton";
import MovieTrailerPlayer from "components/MovieTrailerPlayer";
import MovieSlideshow from "components/slideshows/MovieSlideshow";
import Properties from "config/properties";
import useMediaQuery from "hooks/useMediaQuery";
import { generateYoutubeVideoUrl } from "lib/api/multimedia-api";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useCallback, useState } from "react";
import {
  MovieCredits,
  MovieDetail,
  MoviePreview,
} from "../../@types/models/movie";
import { Review } from "../../@types/models/review";
import { Video } from "../../@types/models/video";
import { Paths } from "../../@types/utils";
import MovieDetailBanner from "../../components/banner/MovieDetailBanner";
import MovieCastSlideshow from "../../components/slideshows/MovieCastSlideshow";
import { hasApiResponsesError } from "../../lib/api/helpers";
import {
  getMovie,
  getMovieCredits,
  getMovieReviews,
  getMoviesByCategory,
  getMoviesLinkedToMovie,
  getMovieYoutubeTrailer,
  getTrendingMovies,
} from "../../lib/api/movie-api";
import { formatNumberToUSDCurrency } from "../../lib/utils";

const revalidateTime = Properties.movieDetailPageRevalidationSeconds;

type Props = {
  movie: MovieDetail;
  credits: MovieCredits;
  recomendations: MoviePreview[];
  reviews: Review[];
  youtubeTrailer: Video | null;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prerenderedMovies = await Promise.all([
    getMoviesByCategory("popular"),
    getMoviesByCategory("top_rated"),
    getMoviesByCategory("now_playing"),
    // getMoviesByCategory("upcoming"),
    getTrendingMovies(),
  ]);

  const hasError = hasApiResponsesError(...prerenderedMovies);
  if (hasError) {
    throw new Error(
      `Error while executing getStaticPaths for Movie Detail Page!`
    );
  }

  let paths: Paths = [];
  prerenderedMovies.map(({ data }) => {
    if (data && data.results) {
      const movies = data.results;
      const moviePaths = movies.map(({ id }) => {
        return {
          params: {
            movieId: String(id),
          },
        };
      });
      paths = paths.concat(moviePaths);
    }
  });

  console.info("Generated %d paths:", paths.length);

  return {
    paths: paths,
    fallback: "blocking",
  };
};

// TODO: add constant values
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const movieId = parseInt(params?.movieId as string);
  console.info(`Generating Movie Detail Page for id ${movieId}..`);

  const requiredData = await Promise.all([
    getMovie(movieId),
    getMovieYoutubeTrailer(movieId),
    getMovieCredits(movieId, 10, 6), // fetch 10 people from the cast (top 10 actors) and 6 people from the crew (producer, director, ecc..)
    getMoviesLinkedToMovie(movieId, "recommendations", 8), //fetch 6 recommended movie
    getMovieReviews(movieId, 8), //fetch the first 8 reviews
  ]);

  const hasError = hasApiResponsesError(...requiredData);
  // const hasValidData = hasApiResponsesValidData(...requestedData);

  if (hasError) {
    throw new Error(
      `Error while generating Movie Detail Page with id ${movieId}. Page generation skipped!`
    );
  }

  const [
    { data: movie },
    { data: youtubeTrailer },
    { data: credits },
    { data: recommendations },
    { data: reviews },
  ] = requiredData;

  return {
    props: {
      movie: movie!,
      credits: credits!,
      recomendations: recommendations!.results,
      reviews: reviews!.results,
      youtubeTrailer: youtubeTrailer || null,
    },
    revalidate: revalidateTime,
  };
};

/**
 * This page render the detail of a specific movie identified by his id:
 * movie general info, cast, crew, reviews and recommended movies
 */
const MoviePage: NextPage<Props> = ({
  movie,
  credits,
  reviews,
  recomendations,
  youtubeTrailer,
}) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const isXlScreen = useMediaQuery("(min-width: 1280px)");
  const isLgScreen = useMediaQuery("(min-width: 1024px)");

  const handlePlayTrailer = useCallback(() => {
    setShowTrailer(true);
  }, []);

  const handleCloseTrailerPlayer = useCallback(() => setShowTrailer(false), []);

  const arrowVariant: ArrowVariant = isXlScreen
    ? "lg"
    : isLgScreen
    ? "base"
    : "sm";

  const isYoutubeTrailerAvailable = youtubeTrailer != null;
  const { title } = movie;
  const { cast, crew } = credits;
  const movieYoutubeTrailerSrc =
    youtubeTrailer != null ? generateYoutubeVideoUrl(youtubeTrailer.key) : "";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {/* Main Movie Banner */}
      <MovieDetailBanner
        key={movie.id}
        movie={movie}
        crew={crew}
        backgroundOpacity={0.2}
        height={700}
        onPlayTrailer={handlePlayTrailer}
        showPlayTrailer={isYoutubeTrailerAvailable}
      />
      {showTrailer && isYoutubeTrailerAvailable && (
        <MovieTrailerPlayer
          videoSrc={movieYoutubeTrailerSrc}
          onClose={handleCloseTrailerPlayer}
        />
      )}

      {/* Row with Cast Slideshow and MovieSecondaryInfo (status, revenue, language ) */}
      <div className="flex mt-10 base-padding">
        {cast.length > 0 && <MovieCastSlideshow cast={cast} />}
        <MovieSecondaryInfo movie={movie} />
      </div>

      {/* Row with movie reviews and a list of recommended movies (on sm screen they are stacked in column) */}
      <div className="flex flex-col mt-20 mb-10 xl:flex-row base-padding">
        <MovieReviewList reviews={reviews} />
        {isXlScreen ? (
          <RecommendedMovieList
            className="max-w-xs ml-auto"
            recomendations={recomendations}
          />
        ) : (
          <MovieSlideshow
            className="mt-10"
            title="Recommended"
            movies={recomendations}
            cardSize="sm"
            cardVariant="base"
            arrowVariant={arrowVariant}
          />
        )}
      </div>
    </>
  );
};

const MovieSecondaryInfo = ({ movie }: { movie: MovieDetail }) => {
  const {
    status,
    budget,
    revenue,
    original_language: originalLanguage,
  } = movie;

  const movieBudget =
    budget !== 0 ? formatNumberToUSDCurrency(budget) : "Not Estimated";
  const movieRevenues =
    revenue !== 0 ? formatNumberToUSDCurrency(revenue) : "Not Estimated";

  return (
    <div className="hidden pb-6 pl-4 mt-10 ml-auto space-y-6 border-l w-80 lg:block border-l-primary-500/70">
      <div className="text-sm 2xl:text-base">
        <h2 className="font-semibold ">Status</h2>
        <p>{status}</p>
      </div>
      <div className="text-sm 2xl:text-base">
        <h2 className="font-semibold">Original Language</h2>
        <p className="uppercase">{originalLanguage}</p>
      </div>
      <div className="text-sm 2xl:text-base">
        <h2 className="font-semibold ">Budget</h2>
        <p className="lining-nums">{movieBudget}</p>
      </div>
      <div className="text-sm 2xl:text-base">
        <h2 className="font-semibold ">Revenue</h2>
        <p className="lining-nums">{movieRevenues}</p>
      </div>
    </div>
  );
};

export default MoviePage;
