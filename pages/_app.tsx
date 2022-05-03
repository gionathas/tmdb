import classNames from "classnames";
import Layout from "components/layout/Layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import "styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Layout
        className={classNames({
          "debug-screens": process.env.NODE_ENV === "development",
        })}
      >
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
