import Properties from "../../config/properties";
import { isValidUrl } from "../utils";

export const generateImageUrlByPathOrDefault = (
  path: string | null | undefined,
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

    const TmdbUrlImageUrl = Properties.TmdbApi.ImagesHost!.concat(path);
    return isValidUrl(TmdbUrlImageUrl) ? TmdbUrlImageUrl : defaultValue;
  }

  return defaultValue;
};
