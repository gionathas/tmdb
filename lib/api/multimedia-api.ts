import Properties from "config/properties";
import { isValidUrl } from "lib/utils";

const { TMDB_API } = Properties;

type backdrop_size = "original" | "w1280";
type poster_size = "original" | "w500" | "w342";
type profile_size = "original" | "w185" | "w45";

const buildImageUrlByPathOrDefault = (
  path: string | null | undefined,
  size: backdrop_size | poster_size | profile_size,
  defaultValue: any
) => {
  if (!path) return defaultValue;

  //tmdb path reference start always with a '/' character
  if (path.startsWith("/")) {
    const subPath = path.slice(1); //get the path without the initial '/'

    //in case the subpath is already a valid url (non-hosted on tmdb)
    if (isValidUrl(subPath)) {
      return subPath;
    }

    const TmdbUrlImageUrl = `${TMDB_API.IMAGE_HOST!}${size}${path}`;
    return isValidUrl(TmdbUrlImageUrl) ? TmdbUrlImageUrl : defaultValue;
  }

  return defaultValue;
};

export const buildPosterImageUrlOrDefault = (
  path: string | null | undefined,
  posterSize: poster_size = "original",
  defaultValue: any
) => {
  return buildImageUrlByPathOrDefault(path, posterSize, defaultValue);
};

export const buildBackdropImageUrlOrDefault = (
  path: string | null | undefined,
  backdropSize: backdrop_size = "original",
  defaultValue: any
) => {
  return buildImageUrlByPathOrDefault(path, backdropSize, defaultValue);
};

export const buildProfilemageUrlOrDefault = (
  path: string | null | undefined,
  profileSize: profile_size = "original",
  defaultValue: any
) => {
  return buildImageUrlByPathOrDefault(path, profileSize, defaultValue);
};

export const buildYoutubeVideoUrl = (key: string): string => {
  return `https://www.youtube.com/watch?v=${key}`;
};
