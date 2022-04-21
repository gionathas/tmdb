import movie from "./json/movie.json";
import reviews from "./json/reviews.json";
import credits from "./json/credits.json";
import recommendations from "./json/recommendations.json";
import movieList from "./json/movie-list.json";
import videos from "./json/videos.json";
import genres from "./json/genres.json";
import coming_soon from "./json/coming-soon.json";
import trendings from "./json/trending.json";
import now_playing from "./json/now-playing.json";
import MockAdapter from "axios-mock-adapter";
import { AxiosInstance } from "axios";

const enableTmdbApiMock = (TmdbAPIClient: AxiosInstance) => {
  const TmddAPIClientMock = new MockAdapter(TmdbAPIClient);

  if (process.env.MOCK_INDEX_PAGE === "true") {
    mockIndexPage(TmddAPIClientMock);
  }

  if (process.env.MOCK_MOVIE_PAGE === "true") {
    mockMoviePage(TmddAPIClientMock);
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

export default enableTmdbApiMock;
