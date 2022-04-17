import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import Layout from "components/layout/Layout";

const Error404Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-light">
          Sorry, we could not find the page you were looking for!
        </h2>
        <Link href={"/"} passHref>
          <button className="px-4 py-2 mt-5 btn btn-primary bg-gray-700/50 ">
            Back to TMDB
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Error404Page;
