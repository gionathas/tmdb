import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

type SearchInputProps = {
  initialQuery?: string;
  className?: string;
  onSearch: (query: string) => void;
};

const SearchInput = ({
  initialQuery = "",
  className = "",
  onSearch,
}: SearchInputProps) => {
  const [query, setQuery] = useState(initialQuery);
  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        className={`peer py-2 px-4 bg-gray-800 rounded-full w-full focus:outline-none opacity-70 focus:opacity-100 focus:border focus:border-primary-500`}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(query);
          }
        }}
      />
      <button
        onClick={() => onSearch(query)}
        className="absolute z-10 bg-gray-800 opacity-50 right-3 peer-focus:opacity-100 disabled:cursor-not-allowed hover:opacity-100 "
        disabled={query.length === 0}
      >
        <SearchIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchInput;
