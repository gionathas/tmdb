import { AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import coming_soon from "./json/coming-soon.json";
import credits from "./json/credits.json";
import genres from "./json/genres.json";
import movieList from "./json/movie-list.json";
import movie from "./json/movie.json";
import now_playing from "./json/now-playing.json";
import recommendations from "./json/recommendations.json";
import reviews from "./json/reviews.json";
import trendings from "./json/trending.json";
import videos from "./json/videos.json";

const enableTmdbApiMock = (TmdbAPIClient: AxiosInstance) => {
  console.info("Enabling mock...");
  const TmddAPIClientMock = new MockAdapter(TmdbAPIClient);

  if (process.env.MOCK_INDEX_PAGE === "true") {
    mockIndexPage(TmddAPIClientMock);
  }

  if (process.env.MOCK_MOVIE_PAGE === "true") {
    mockMoviePage(TmddAPIClientMock);
  }

  if (process.env.MOCK_DISCOVER_PAGE === "true") {
    mockDiscoverPage(TmddAPIClientMock);
  }
};

const mockMoviePage = (TmdbApiMock: MockAdapter) => {
  TmdbApiMock.onGet(/\/movie\/\d+\/recommendations/)
    .reply(200, recommendations)
    .onGet(/\/movie\/\d+\/reviews/)
    .reply(200, reviews)
    .onGet(/\/movie\/\d+\/credits/)
    .reply(200, credits)
    .onGet(/\/movie\/\d+\/videos/)
    .reply(200, videos)
    .onGet("/movie/3")
    .reply(500)
    .onGet("/movie/2")
    .reply(404)
    .onGet(/\/movie\/\d+/)
    .reply(200, movie);
};

const mockIndexPage = (TmdbApiMock: MockAdapter) => {
  TmdbApiMock.onGet(/\/movie\/(popular|top_rated)/)
    .reply(200, movieList)
    .onGet("/movie/now_playing")
    .reply(200, now_playing)
    .onGet("/movie/upcoming")
    .reply(200, coming_soon)
    .onGet("/trending/movie/week")
    .reply(200, trendings)
    .onGet("/genre/movie/list")
    .reply(200, genres);
};

const mockDiscoverPage = (TmdbApiMock: MockAdapter) => {
  TmdbApiMock.onGet(new RegExp("/search/movie*")).reply(200, movieList);
};

export default enableTmdbApiMock;
