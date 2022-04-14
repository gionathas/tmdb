import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import movie from "../mock-data/json/movie.json";

// axios common configurations
axios.defaults.timeout = 8000;

// axios api clients
export const TmdbAPI = axios.create({
  baseURL: `${process.env.TMDB_API_HOST}/${process.env.TMDB_API_VERSION}`,
  params: {
    api_key: `${process.env.TMDB_API_KEY}`,
  },
});

export const TmdbImagesAPI = axios.create({
  baseURL: process.env.TMDB_API_IMAGES_HOST,
});

// api mock setup
const setupTmdbApiMocks = (): MockAdapter => {
  return new MockAdapter(TmdbAPI);
};

const setupMoviePageMocks = (TmdbApiMock: MockAdapter) => {
  TmdbApiMock.onGet("/movie/1")
    .reply(200, movie)
    .onGet("/movie/2")
    .reply(400, movie)
    .onGet("/movie/3")
    .networkError()
    .onGet("/movie/4")
    .timeout();
};

if (process.env.MOCKS_ENABLED === "true") {
  const TmddApiMock = setupTmdbApiMocks();

  if (process.env.MOCK_MOVIE_PAGE === "true") {
    setupMoviePageMocks(TmddApiMock);
  }
}
