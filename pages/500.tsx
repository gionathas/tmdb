import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Error500Page: NextPage = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center h-full min-h-screen">
      <h2 className="text-xl antialiased font-medium">
        Sorry, something went wrong :(
      </h2>
      <Link href={"/"} passHref>
        <button className="px-4 py-2 mt-5 text-xs btn btn-primary bg-gray-700/50">
          Back to TMDB
        </button>
      </Link>
    </div>
  );
};

export default Error500Page;
