export const Properties = {
  TMDB_API: {
    HOST: process.env.TMDB_API_HOST,
    VERSION: process.env.TMDB_API_VERSION,
    IMAGE_HOST: process.env.NEXT_PUBLIC_TMDB_API_IMAGES_HOST, //this is browser accessible
  },
  LOGO_PATH: "/logo.svg",
  DEFAULT_AVATART_IMG_SRC: "/img/default_avatar.jpeg",
  DEFAULT_MOVIE_SLIDESHOW_SCROLL_X_OFFSET: 800,
  DEFAULT_CAST_SLIDESHOW_SCROLL_X_OFFSET: 400,
  DEFAULT_HEADER_SCROLL_Y_OFFSET: 60,
  DEFAULT_CAROUSEL_INTERVAL_SECONDS: 15 * 1000, // every 15 seconds (15000ms)
  DEFAULT_INDEX_PAGE_REVALIDATION_SECONDS: 1 * 60 * 60, // every hour
  DEFAULT_MOVIE_DETAIL_PAGE_REVALIDATION_SECONDS: 5 * 60, // every 5 minute
  DEFAULT_GENRES_TO_SHOW: 2,
};

export default Properties;
