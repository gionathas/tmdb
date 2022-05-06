import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const Error404Page: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen">
      <h2 className="text-xl font-light">
        Sorry, we couldn&apos;t find the page you were looking for!
      </h2>
      <Link href={"/"} passHref>
        <button className="px-4 py-2 mt-5 text-xs btn btn-primary bg-gray-700/50">
          Back to TMDB
        </button>
      </Link>
    </div>
  );
};

export default Error404Page;
