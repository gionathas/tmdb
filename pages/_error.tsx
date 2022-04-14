import { NextPageContext } from "next";
import React from "react";
import Layout from "../components/layout/Layout";

interface ErrorComponentProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorComponentProps) => {
  return (
    <Layout>
      return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      );
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
