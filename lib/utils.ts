export const isLastElement = (idx: number, array: Array<any>) => {
  return idx === array.length - 1;
};

export const formatNumberToUSDCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (error) {
    return false;
  }
  return true;
};
