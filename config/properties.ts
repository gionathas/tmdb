export const Properties = {
  TmdbApi: {
    host: process.env.TMDB_API_HOST,
    version: process.env.TMDB_API_VERSION,
    ImagesHost: process.env.NEXT_PUBLIC_TMDB_API_IMAGES_HOST, //this is browser accessible
  },
  defaultAvatarImageSrc: "/img/default_avatar.jpeg",
  movieSlideshowScrollOffset: 800,
  castSlideshowScrollOffset: 400,
};

export default Properties;
