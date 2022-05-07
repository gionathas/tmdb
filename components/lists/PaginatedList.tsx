import Spinner from "components/miscellaneous/Spinner";
import React from "react";
import ReactPaginate from "react-paginate";
import List, { ListProps } from "./List";

export type PaginatedListProps<T> = ListProps<T> & {
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  page: number;
};

const PaginatedList = <T extends unknown>({
  onPageChange,
  totalPages,
  isLoading = false,
  page,
  ...rest
}: PaginatedListProps<T>) => {
  const showPagination = totalPages > 1;

  const color =
    "border-gray-500/50 hover:bg-gray-500 transition-colors duration-200";

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="text-center" />
        </div>
      ) : (
        <>
          <List {...rest} />
          {showPagination && (
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              previousLabel="Prev"
              pageRangeDisplayed={1}
              marginPagesDisplayed={2}
              onPageChange={(selectedItem: { selected: number }) =>
                onPageChange(selectedItem.selected + 1)
              }
              forcePage={page - 1}
              pageCount={totalPages}
              containerClassName="flex my-5 justify-center items-center text-xs"
              pageClassName={`border-y border-l px-3 py-2 ${color}`}
              breakClassName={`border-y border-l p-2 ${color}`}
              previousClassName={`border-l rounded-l px-2 py-2 border-y ${color}`}
              nextClassName={`border rounded-r px-2 py-2 border-y ${color}`}
              activeClassName="bg-primary-500 hover:bg-primary-500"
              renderOnZeroPageCount={() => null}
            />
          )}
        </>
      )}
    </>
  );
};

export default PaginatedList;
