import { handleError } from "./helpers";
import { TmdbAPI } from "../../config/clients";
import { Genre, Genres } from "../../@types/models/genre";
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
