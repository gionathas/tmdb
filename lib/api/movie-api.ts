import { TmdbAPI } from "config/clients";
import { SortOrder } from "lib/common";
import {
  MovieCredits,
  MovieDetail,
  MoviePreview,
} from "../../@types//models/movie";
import { Credit } from "../../@types/models/credit";
import { Review } from "../../@types/models/review";
import { Video } from "../../@types/models/video";
import { handleError } from "./helpers";
import {
  ApiResponse,
  ApiResponseWithPagination,
  TmdbListResponse,
  TmdbPaginatedResponse,
} from "./types";

export const basePath = "/movie";
export type MovieCategory =
  | "popular"
  | "top_rated"
  | "now_playing"
  | "upcoming";
export type LinkedMovieCategory = "recommendations" | "similar";

export const TMDBApiRoutes = {
  getMovieByMovieId: (movieId: number) => `${basePath}/${movieId}`,
  getMovieCreditsByMovieId: (movieId: number) =>
    `${basePath}/${movieId}/credits`,
  getMoviesByCategory: (ctg: MovieCategory) => `${basePath}/${ctg}`,
  getTrendingMovies: `/trending/movie/week`,
  getLinkedMoviesByMovieIdAndCategory: (
    movieId: number,
    ctg: LinkedMovieCategory
  ) => `${basePath}/${movieId}/${ctg}`,
  getMovieReviewsByMovieId: (movieId: number) =>
    `${basePath}/${movieId}/reviews`,
  getMovieVideos: (movieId: number) => `${basePath}/${movieId}/videos`,
};

export const getMovie = async (
  movieId: number
): Promise<ApiResponse<MovieDetail>> => {
  try {
    const apiRoute = TMDBApiRoutes.getMovieByMovieId(movieId);

    console.info(`Getting movie with id: ${movieId}..`);
    const { data } = await TmdbAPI.get<MovieDetail>(apiRoute);
    console.info(`Movie with id ${movieId} succesfully retrieved!`);

    return { data };
  } catch (error) {
    console.error(`Error while retrieving movie with id: ${movieId}!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getMoviesByCategory = async (
  category: MovieCategory,
  size?: number
): Promise<ApiResponseWithPagination<MoviePreview>> => {
  try {
    const apiRoute = TMDBApiRoutes.getMoviesByCategory(category);

    console.info(`Getting movies with category: ${category}..`);
    const { data: movies } = await TmdbAPI.get<
      TmdbPaginatedResponse<MoviePreview>
    >(apiRoute);
    console.info(`${category} movies succesfully retrieved!`);

    //sorting and filtering
    movies.results = movies.results.sort(sortMoviesByPopularity).slice(0, size);

    return { data: movies };
  } catch (error) {
    console.error(`Error while retrieving movies with category: ${category}!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getTrendingMovies = async (
  size?: number
): Promise<ApiResponseWithPagination<MoviePreview>> => {
  try {
    const { getTrendingMovies: apiRoute } = TMDBApiRoutes;

    console.info(`Getting Trending movies..`);
    const { data: trendingMovies } = await TmdbAPI.get<
      TmdbPaginatedResponse<MoviePreview>
    >(apiRoute);
    console.info("Trending Movies successfully retrived!");

    // sorting and filtering
    trendingMovies.results = trendingMovies.results.slice(0, size);

    return { data: trendingMovies };
  } catch (error) {
    console.error(`Error while retrieving Trending movies!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getMoviesLinkedToMovie = async (
  movieId: number,
  category: LinkedMovieCategory,
  size: number = 10
): Promise<ApiResponseWithPagination<MoviePreview>> => {
  try {
    const apiRoute = TMDBApiRoutes.getLinkedMoviesByMovieIdAndCategory(
      movieId,
      category
    );

    console.info(
      `Getting ${category} movies linked to movie with id ${movieId}..`
    );
    const { data: linkedMovies } = await TmdbAPI.get<
      TmdbPaginatedResponse<MoviePreview>
    >(apiRoute);
    console.info(
      `${category} movies of movie with id ${movieId} succesfully retrieved!`
    );

    //sorting and filtering
    linkedMovies.results = linkedMovies.results.slice(0, size);

    return { data: linkedMovies };
  } catch (error) {
    console.error(
      `Error while retrieving ${category} movies of movie with id ${movieId}`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getMovieCredits = async (
  movieId: number,
  castSize: number = 10,
  crewSize: number = 10
): Promise<ApiResponse<MovieCredits>> => {
  try {
    const apiRoute = TMDBApiRoutes.getMovieCreditsByMovieId(movieId);

    console.info(`Getting credits of movie with id ${movieId}..`);
    const { data: credits } = await TmdbAPI.get<MovieCredits>(apiRoute);
    console.info(`Credits of movie with id ${movieId} succesfully retrieved!`);

    //filtering and sorting
    credits.cast = credits.cast.slice(0, castSize);
    //cast is already sorted by popularity by the api
    credits.crew = credits.crew
      .sort(sortCreditsByPopularity)
      .slice(0, crewSize);

    return { data: credits };
  } catch (error) {
    console.error(
      `Error while retrieving credits of movie with id ${movieId}!`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getMovieReviews = async (
  movieId: number,
  size: number = 10
): Promise<ApiResponseWithPagination<Review>> => {
  try {
    const apiRoute = TMDBApiRoutes.getMovieReviewsByMovieId(movieId);

    console.info(`Getting reviews of movie with id ${movieId}..`);
    const { data: reviews } = await TmdbAPI.get<TmdbPaginatedResponse<Review>>(
      apiRoute
    );
    console.info(`Reviews of movie with id ${movieId} succesfully retrieved!`);

    // apply filtering and sorting
    reviews.results = reviews.results
      .sort(sortReviewsByCreationTime)
      .slice(0, size);

    return { data: reviews };
  } catch (error) {
    console.error(
      `Error while retrieving reviews of movie with id ${movieId}!`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

export const getMovieYoutubeTrailer = async (
  movieId: number
): Promise<ApiResponse<Video>> => {
  try {
    const apiRoute = TMDBApiRoutes.getMovieVideos(movieId);

    console.info(`Getting videos of movie with id ${movieId}..`);
    const { data: videos } = await TmdbAPI.get<TmdbListResponse<Video>>(
      apiRoute
    );
    console.info(`Videos of movie with id ${movieId} succesfully retrieved!`);

    console.info(
      `Searching for youtube trailer of movie with id ${movieId}...`
    );

    //return the first official youtube trailer (if exist)
    const youtubeTrailer =
      videos.results &&
      videos.results.sort((a, b) => Number(b.official) - Number(a.official)) && //sort by official trailer first
      videos.results.find(
        (video) =>
          video.type.toLowerCase() === "trailer" &&
          video.site.toLowerCase() === "youtube"
      );
    console.info(
      `Youtube trailer of movie with id ${movieId} ${
        youtubeTrailer != null ? "successfully found" : "were not found"
      }!`
    );

    return { data: youtubeTrailer };
  } catch (error) {
    console.error(
      `Error while retrieving youtube trailer of movie with id ${movieId}!`
    );
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

//utilities
const sortMoviesByPopularity = <T extends MoviePreview>(
  a: T,
  b: T,
  mode: SortOrder = "desc"
): number => {
  return mode === "desc"
    ? b.popularity - a.popularity
    : a.popularity - b.popularity;
};

const sortCreditsByPopularity = (
  a: Credit,
  b: Credit,
  mode: SortOrder = "desc"
): number => {
  return mode === "desc"
    ? b.popularity - a.popularity
    : a.popularity - b.popularity;
};

const sortReviewsByCreationTime = (
  a: Review,
  b: Review,
  mode: SortOrder = "desc"
): number => {
  return mode === "desc"
    ? new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
    : new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf();
};
