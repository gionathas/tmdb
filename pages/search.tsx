import { SearchIcon } from "@heroicons/react/outline";
import MovieCard from "components/cards/MovieCard";
import List from "components/lists/List";
import { swrFetcher } from "config/clients";
import { getAllGenres } from "lib/api/genre-api";
import { hasApiResponsesError } from "lib/api/helpers";
import { searchMovie } from "lib/api/movie-api";
import { TmdbPaginatedResponse } from "lib/api/types";
import { getQueryParam } from "lib/utils";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { MoviePreview } from "../@types/models/movie";
import { SharedPageProps } from "./_app";

type SearchPageProps = SharedPageProps & {
  initialResults: TmdbPaginatedResponse<MoviePreview>;
};

const SearchPage: NextPage<SearchPageProps> = ({ initialResults }) => {
  const router = useRouter();
  const { query } = router;
  const searchQuery = (query["query"] as string) || "";
  const page = Number((query["page"] as string) || "1");
  const [search, setSearch] = useState<string | null>(null);
  const isInitialReq = useRef(true);
  const {
    data: results,
    error,
    isValidating,
  } = useSWR<TmdbPaginatedResponse<MoviePreview>>(
    search ? search : null,
    swrFetcher,
    {
      dedupingInterval: 30 * 1000,
      fallbackData: initialResults,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  const handleSearch = (searchQuery: string) => {
    router.replace(`/search?query=${searchQuery}&page=1`, undefined, {
      shallow: true,
      scroll: true,
    });
  };

  const handlePageChange = (page: number) => {
    router.replace(`/search?query=${searchQuery}&page=${page}`, undefined, {
      shallow: true,
      scroll: true,
    });
  };

  useEffect(() => {
    if (!isInitialReq.current) {
      setSearch(`/api/search?query=${searchQuery}&page=${page}`);
    } else {
      isInitialReq.current = false;
    }
  }, [searchQuery, page]);

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <section className="pt-28 base-padding">
        <SearchInput
          initialQuery={searchQuery}
          onSearch={handleSearch}
          className="w-full md:w-96"
        />
        <ResultList
          key={searchQuery}
          onPageChange={handlePageChange}
          results={results!}
          className="mt-10 md:ml-10 md:mt-0"
        />
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

const ResultList = ({
  className,
  results,
  onPageChange,
}: {
  results: TmdbPaginatedResponse<MoviePreview>;
  className?: string;
  onPageChange: (page: number) => void;
}) => {
  const items = results.results;
  const totalPages = results.total_pages;
  const showPagination = totalPages > 1;

  return (
    <div className={className}>
      <List
        className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        title={<h2 className="mb-2 text-xl">Results</h2>}
        emptyTitle={"No results found!"}
        items={items}
        renderItem={(movie) => (
          <MovieCard movie={movie} variant="base" size="sm" />
        )}
        keyExtractor={(movie) => String(movie.id)}
      />
      {showPagination && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={(selectedItem: { selected: number }) =>
            onPageChange(selectedItem.selected + 1)
          }
          pageRangeDisplayed={1}
          marginPagesDisplayed={2}
          pageCount={totalPages}
          previousLabel="Prev"
          pageClassName="border-y border-l border-gray-500/50 px-3 py-2 hover:bg-gray-500 transition-colors duration-200"
          pageLinkClassName="h-full w-full"
          breakClassName="border-y border-l border-gray-500/50 p-2 hover:bg-gray-500 transition-colors duration-200"
          containerClassName="flex my-5 justify-center items-center text-xs"
          previousClassName="border-l rounded-l px-2 py-2 border-y border-gray-500/50 hover:bg-gray-500 transition-colors duration-200"
          nextClassName="border rounded-r px-2 py-2 border-y border-gray-500/50 hover:bg-gray-500 transition-colors duration-200"
          activeClassName="bg-primary-500 hover:bg-primary-500"
          renderOnZeroPageCount={() => null}
        />
      )}
    </div>
  );
};

const SearchInput = ({
  initialQuery,
  className,
  onSearch,
}: {
  initialQuery: string;
  className: string;
  onSearch: (query: string) => void;
}) => {
  const [query, setQuery] = useState(initialQuery);
  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        className={`py-2 bg-transparent border-b border-primary-500/50 w-full focus:outline-none focus:border-primary-500`}
        type="text"
        name=""
        id=""
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
      />
      <button
        onClick={() => onSearch(query)}
        className="absolute right-0 disabled:opacity-20"
        disabled={query.length === 0}
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchPage;
