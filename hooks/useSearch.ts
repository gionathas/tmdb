import { swrFetcher } from "config/clients";
import routes from "config/routes";
import { TmdbPaginatedResponse } from "lib/api/types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

/**
 * This hook is used in the search page.
 * Each time the search query or the page chages, the hook uses the useSWR hook (client side data fetcher) for fetching the requested data.
 * On mount it will skip the data fetching using instead the initialResults as the first results.
 */
const useSearch = <T extends unknown>(
  initialResults: TmdbPaginatedResponse<T>
) => {
  const router = useRouter();
  const { query } = router;
  const searchQuery = (query["query"] as string) || "";
  const page = Number((query["page"] as string) || "1");
  const hasMounted = useRef(true);
  const [search, setSearch] = useState<string | null>(null);
  const {
    data: results,
    error,
    isValidating,
  } = useSWR<TmdbPaginatedResponse<T>>(search ? search : null, swrFetcher, {
    dedupingInterval: 30 * 1000,
    fallbackData: hasMounted ? initialResults : undefined,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const isLoading = (!results && !error) || isValidating;

  const handleSearch = useCallback(
    (searchQuery: string) => {
      router.replace(
        `${routes.searchPage}?query=${searchQuery}&page=1`,
        undefined,
        {
          shallow: true,
          scroll: true,
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePageChange = useCallback(
    (page: number) => {
      router.replace(
        `${routes.searchPage}?query=${searchQuery}&page=${page}`,
        undefined,
        {
          shallow: true,
          scroll: true,
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchQuery]
  );

  useEffect(() => {
    if (!hasMounted.current) {
      setSearch(`/api/search?query=${searchQuery}&page=${page}`);
    } else {
      hasMounted.current = false;
    }
  }, [searchQuery, page]);

  return {
    results,
    searchQuery,
    page,
    isLoading,
    handleSearch,
    handlePageChange,
  };
};

export default useSearch;
