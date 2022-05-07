import { searchMovie } from "lib/api/movie-api";
import { TmdbPaginatedResponse } from "lib/api/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { MoviePreview } from "../../@types/models/movie";

// TODO: add authentication
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TmdbPaginatedResponse<MoviePreview>>
) {
  if (req.method === "GET") {
    const queryParam = req.query;
    const searchQuery = queryParam["query"] as string;
    const page = Number(queryParam["page"] as string);

    const { data: results, error } = await searchMovie(searchQuery, page);
    const statusCode = error ? 500 : 200;
    res.status(statusCode).json(results!);
  }
}
