import { ParsedUrlQuery } from "querystring";

export const isLastElement = (idx: number, array: Array<any>): boolean => {
  return idx === array.length - 1;
};

export const formatNumberToUSDCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};

export const getQueryParam = (
  key: string,
  query: ParsedUrlQuery
): string | undefined => {
  return query[key] as string;
};

export const toBase64 = (str: string): string =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
