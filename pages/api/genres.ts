import { getAllGenres } from "lib/api/genre-api";
import { ApiResponse } from "lib/api/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Genre } from "../../@types/models/genre";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Genre[]>>
) {
  if (req.method === "GET") {
    const apiResponse = await getAllGenres();
    const statusCode = apiResponse.error ? 500 : 200;
    res.status(statusCode).json(apiResponse);
  }
}
