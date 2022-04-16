import axios, { AxiosRequestConfig } from "axios";
import enableTmdbApiMock from "../mock/api-mock";

// axios common configurations
axios.defaults.timeout = 8000;

// axios api clients
const TmdbAPIConfig: AxiosRequestConfig = {
  baseURL: `${process.env.TMDB_API_HOST}/${process.env.TMDB_API_VERSION}`,
  params: {
    api_key: `${process.env.TMDB_API_KEY}`,
  },
};
export const TmdbAPI = axios.create(TmdbAPIConfig);
if (process.env.MOCKS_ENABLED === "true") {
  enableTmdbApiMock(TmdbAPI);
}

// NOTE: currently the images api is never mocked
export const TmdbImagesAPI = axios.create({
  baseURL: process.env.TMDB_API_IMAGES_HOST,
});
