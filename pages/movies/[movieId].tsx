import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import { Genre } from "../../@types/models/genre";
import {
  MovieCredits,
  MovieDetail,
  MoviePreview,
} from "../../@types/models/movie";
import { Review } from "../../@types/models/review";
import { Paths } from "../../@types/utils";
import MovieDetailBanner from "../../components/banner/MovieDetailBanner";
import MoviePreviewCard from "../../components/cards/MoviePreviewCard";
import Layout from "../../components/layout/Layout";
import MovieReview from "../../components/MovieReview";
import MovieCastSlideshow from "../../components/slideshows/MovieCastSlideshow";
import { getAllGenres } from "../../lib/api/genre-api";
import {
  hasApiResponsesError,
  hasApiResponsesValidData,
} from "../../lib/api/helpers";
import {
  getMovie,
  getMovieCredits,
  getMovieReviews,
  getMoviesByCategory,
  getMoviesLinkedToMovie,
} from "../../lib/api/movie-api";
import { formatNumberToUSDCurrency } from "../../lib/utils";

type Props = {
  movie: MovieDetail | null;
  genres: Genre[] | null;
  credits: MovieCredits | null;
  recomendations: MoviePreview[] | null;
  reviews: Review[] | null;
  hasError: boolean;
};

//TODO: add also other movie ids to be pre-rendered (such as top rated or trending movies)
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: popularMovies } = await getMoviesByCategory("popular");

  let paths: Paths = [];
  // pre-render popular movies
  if (popularMovies && popularMovies.results) {
    const { results } = popularMovies;
    const popularMoviePaths = results.map(({ id }) => {
      return {
        params: {
          movieId: id.toString(),
        },
      };
    });
    paths.concat(popularMoviePaths);
  }

  return {
    paths: paths,
    fallback: "blocking",
  };
};

// TODO: add constant values
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const movieId = parseInt(params?.movieId as string);
  console.info(`Generating Movie Detail Page for id ${movieId}..`);

  const requestedData = await Promise.all([
    getMovie(movieId),
    getAllGenres(),
    getMovieCredits(movieId, 10, 6),
    getMoviesLinkedToMovie(movieId, "recommendations", 6),
    getMovieReviews(movieId, 8),
  ]);

  const hasError = hasApiResponsesError(...requestedData);
  const hasValidData = hasApiResponsesValidData(...requestedData);

  if (!hasError && !hasValidData) {
    return {
      notFound: true,
    };
  }

  const [
    { data: movie },
    { data: genres },
    { data: credits },
    { data: recommendations },
    { data: reviews },
  ] = requestedData;

  return {
    props: {
      movie: movie || null,
      genres: genres || null,
      credits: credits || null,
      recomendations: (recommendations && recommendations.results) || null,
      reviews: (reviews && reviews.results) || null,
      hasError,
    },
  };
};

/**
 * This page render a specific movie, identified his id.
 */
const MoviePage: NextPage<Props> = ({
  movie,
  genres,
  credits,
  reviews,
  recomendations,
  hasError,
}) => {
  if (hasError) {
    return <Error statusCode={500} />;
  }

  const { title } = movie!;
  const { cast, crew } = credits!;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Layout>
        <MovieDetailBanner className="h-[680px]" movie={movie!} crew={crew} />
        <div className="grid grid-cols-7 mt-10 mb-32">
          {/* Column with Cast Slideshows + Reviews */}
          <div className="col-span-5 pl-10">
            <MovieCastSlideshow cast={cast} />
            <ReviewList reviews={reviews!} />
          </div>
          {/* Column with Menu (on the right) */}
          <div className="col-span-2">
            <MovieSecondaryInfo movie={movie!} />
            <RecommendedMovieList
              recomendations={recomendations!}
              genresMap={genres!}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

// TODO: Add Infine Scroll effect
const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="mt-16 ml-4">
      <h2 className="text-xl font-medium">Reviews</h2>
      {reviews.length === 0 && (
        <p className="mt-4 ml-4 text-sm font-light">
          No review of this movie has been written yet!
        </p>
      )}
      <div className="space-y-4">
        {reviews.map((review) => (
          <MovieReview key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

const RecommendedMovieList = ({
  recomendations,
  genresMap,
}: {
  recomendations: MoviePreview[];
  genresMap: Genre[];
}) => {
  return (
    <div className="px-2 mt-32">
      <h2 className="text-2xl font-medium">Reccomended for you</h2>
      <div className="grid grid-cols-2 mt-4 gap-y-10">
        {recomendations.length === 0 && (
          <h2 className="font-light">No Recommended movies to show!</h2>
        )}
        {recomendations.map((movie) => (
          <MoviePreviewCard
            key={movie.id}
            genresMap={genresMap}
            movie={movie}
            size="md"
          />
        ))}
      </div>
    </div>
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
    <div className="pb-6 pl-4 mt-10 space-y-6 border-l border-l-primary-500/70">
      <div>
        <h2 className="text-sm font-semibold">Status</h2>
        <p className="text-sm">{status}</p>
      </div>
      <div>
        <h2 className="text-sm font-semibold">Original Language</h2>
        <p className="text-sm uppercase">{originalLanguage}</p>
      </div>
      <div>
        <h2 className="text-sm font-semibold">Budget</h2>
        <p className="text-sm lining-nums">{movieBudget}</p>
      </div>
      <div>
        <h2 className="text-sm font-semibold">Revenue</h2>
        <p className="text-sm lining-nums">{movieRevenues}</p>
      </div>
    </div>
  );
};

export default MoviePage;
