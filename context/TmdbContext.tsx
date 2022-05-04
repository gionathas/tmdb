import React, { createContext } from "react";
import { Genre } from "../@types/models/genre";

interface TmdbContextState {
  genresMap: Genre[];
}

export const TmdbContext = createContext<TmdbContextState>({
  genresMap: [],
});

type TmdbContextProviderProps = TmdbContextState & {
  children: React.ReactNode;
};

export const TmdbContextProvider = ({
  genresMap,
  children,
}: TmdbContextProviderProps) => {
  const state: TmdbContextState = { genresMap };
  return <TmdbContext.Provider value={state}>{children}</TmdbContext.Provider>;
};

export default TmdbContextProvider;
