import type { GetStaticProps, NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import MoviePreviewSlideshow from "../components/slideshows/MoviePreviewsSlideshow";
import { getMovies } from "../lib/api/movie-api";
import { MoviePreview } from "../@types/models/movie";
import { Genre } from "../@types/models/genre";
import { getAllGenres } from "../lib/api/genre-api";
import { hasApiResponsesError } from "../lib/api/helpers";

type Props = {
  popularMovies: MoviePreview[] | null;
  topRatedMovies: MoviePreview[] | null;
  genresMap: Genre[] | null;
  hasError: boolean;
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  console.info("Generating Index Page..");

  //fetching data from tmdb api
  const requestedData = await Promise.all([
    getMovies("popular"),
    getMovies("top_rated"),
    getAllGenres(),
  ]);

  const hasError = hasApiResponsesError(...requestedData);
  const [{ data: popularMovies }, { data: topRatedMovies }, { data: genres }] =
    requestedData;

  return {
    props: {
      popularMovies: (popularMovies && popularMovies.results) || null,
      topRatedMovies: (topRatedMovies && topRatedMovies.results) || null,
      genresMap: genres || null,
      hasError,
    },
  };
};

const HomePage: NextPage<Props> = ({
  popularMovies,
  topRatedMovies,
  genresMap,
  hasError,
}: Props) => {
  if (hasError) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <Head>
        <title>TMDB</title>
      </Head>
      <Layout>
        <div className="space-y-10">
          <div className="p-4">
            <MoviePreviewSlideshow
              movies={popularMovies!}
              title="Popular Movies on TMDB"
              genresMap={genresMap!}
              previewSize="lg"
            />
          </div>
          <div className="p-4">
            <MoviePreviewSlideshow
              movies={topRatedMovies!}
              title="Top Rated &#11088;"
              genresMap={genresMap!}
              previewSize="md"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
