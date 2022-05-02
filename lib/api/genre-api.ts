import { TmdbAPI } from "config/clients";
import { Genre, Genres } from "../../@types/models/genre";
import { handleError } from "./helpers";
import { ApiResponse } from "./types";

const basePath = "/genre";
const ApiRoutes = {
  genreList: `${basePath}/movie/list`,
};

export const getAllGenres = async (): Promise<ApiResponse<Genre[]>> => {
  try {
    const apiRoute = ApiRoutes.genreList;

    console.info(`Getting genres..`);
    const { data } = await TmdbAPI.get<Genres>(apiRoute);
    console.info(`Movie genres successfully retrieved!`);

    return { data: data.genres };
  } catch (error) {
    console.error(`Error while retrieving genres!`);
    const { code, message } = handleError(error);
    return { error: { code, message } };
  }
};

/**
 * @param movieGenreIds list of genres id to map
 * @param genresMap a map where the key is the genred id and the value is the genre name
 * @returns the list of the genres names mapped by their respective ids
 */
export const getMovieGenresFromIds = (
  movieGenreIds: number[],
  genresMap: Genre[]
): string[] => {
  return movieGenreIds
    .map((genre_id) => {
      const genre = genresMap.find(({ id }) => id === genre_id);
      return genre && genre.name;
    })
    .filter((genre_name): genre_name is string => {
      return typeof genre_name === "string";
    });
};
