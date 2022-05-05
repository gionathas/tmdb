import MovieResultList from "components/lists/MovieResultList";
import SearchInput from "components/miscellaneous/SearchInput";
import useSearch from "hooks/useSearch";
import { getAllGenres } from "lib/api/genre-api";
import { hasApiResponsesError } from "lib/api/helpers";
import { searchMovie } from "lib/api/movie-api";
import { TmdbPaginatedResponse } from "lib/api/types";
import { getQueryParam } from "lib/utils";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { MoviePreview } from "../@types/models/movie";
import { SharedPageProps } from "./_app";

type SearchPageProps = SharedPageProps & {
  initialResults: TmdbPaginatedResponse<MoviePreview>;
};

const SearchPage: NextPage<SearchPageProps> = ({ initialResults }) => {
  const {
    results,
    searchQuery,
    page,
    isLoading,
    handlePageChange,
    handleSearch,
  } = useSearch<MoviePreview>(initialResults);

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <section className="pt-28 base-padding">
        <SearchInput
          initialQuery={searchQuery}
          onSearch={handleSearch}
          className="w-full mx-auto sm:w-96"
        />
        <div className="mt-6">
          <MovieResultList
            key={searchQuery}
            isLoading={isLoading}
            className={
              "flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-10"
            }
            onPageChange={handlePageChange}
            page={page}
            results={results!}
          />
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async (
  context
) => {
  console.info("Generating Discover Page..");
  const { query } = context;
  const searchQuery = getQueryParam("query", query) || "";
  const page = Number(getQueryParam("page", query) || "1");

  const requestedData = await Promise.all([
    searchMovie(searchQuery, page),
    getAllGenres(),
  ]);

  const hasError = hasApiResponsesError(...requestedData);

  if (hasError) {
    throw new Error(`Error while generating Discover page!`);
  }

  const [{ data: results }, { data: genresMap }] = requestedData;

  return {
    props: {
      initialResults: results!,
      genresMap: genresMap!,
    },
  };
};

export default SearchPage;
