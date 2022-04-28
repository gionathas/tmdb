export const Properties = {
  TmdbApi: {
    host: process.env.TMDB_API_HOST,
    version: process.env.TMDB_API_VERSION,
    ImagesHost: process.env.NEXT_PUBLIC_TMDB_API_IMAGES_HOST, //this is browser accessible
  },
  logoPath: "/logo.svg",
  defaultAvatarImageSrcPath: "/img/default_avatar.jpeg",
  movieSlideshowScrollXOffset: 800,
  castSlideshowScrollXOffset: 400,
  headerScrollYOffset: 60,
  carouselIntervalMillis: 15000, // every 7 seconds (15000ms)
  indexPageRevalidationSeconds: 3600, // every hour
  movieDetailPageRevalidationSeconds: 300, // every 5 minute
  defaultGenresToShowNumber: 2,
};

export default Properties;
