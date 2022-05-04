import classNames from "classnames";
import Layout from "components/layout/Layout";
import TmdbContextProvider from "context/TmdbContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.css";
import { Genre } from "../@types/models/genre";

export type SharedPageProps = {
  genresMap?: Genre[];
};

function MyApp({ Component, pageProps }: AppProps) {
  const sharedProps = pageProps as SharedPageProps;
  const isDevEnvironment = process.env.NODE_ENV === "development";

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <TmdbContextProvider genresMap={sharedProps.genresMap ?? []}>
        <Layout
          className={classNames({
            "debug-screens": isDevEnvironment,
          })}
        >
          <Component {...pageProps} />
        </Layout>
      </TmdbContextProvider>
    </>
  );
}

export default MyApp;
