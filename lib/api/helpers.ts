import axios, { AxiosError } from "axios";
import { ApiError, ApiResponse } from "./types";

export const handleError = (error: any): ApiError => {
  let errorCode: ApiError["code"];
  let errorMsg: ApiError["message"];

  if (axios.isAxiosError(error)) {
    const { message, response } = error as AxiosError;
    errorMsg = message;
    errorCode = response ? response.status : 500;
  } else {
    console.error(error);
    errorMsg = "Unexpected Error!";
    errorCode = 500;
  }
  console.error("An error occurred: ", errorMsg);
  return { code: errorCode, message: errorMsg };
};

export const hasApiResponsesError = (
  ...apiResponses: ApiResponse<any>[]
): boolean => {
  return apiResponses.some(({ error }) => error != null);
};

export const hasApiResponsesValidData = (
  ...apiResponses: ApiResponse<any>[]
): boolean => {
  return apiResponses.every(({ data }) => data != null);
};
