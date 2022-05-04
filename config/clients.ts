import axios, { AxiosRequestConfig } from "axios";
import enableTmdbApiMock from "../__mocks__/api-mock";

// axios common configurations
axios.defaults.timeout = 10000;

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

// used by useSWR hook (client side data fetching) -- It points to the internale API exposed by NextJS
export const swrFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);
