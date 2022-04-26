import React, { useCallback, useState } from "react";
import ReactPlayer from "react-player/youtube";

/**
 * It render a youtube player linked to the movie trailer
 * @returns
 */
const MovieTrailerPlayer = ({
  videoSrc,
  onClose: handleClose,
}: {
  videoSrc: string;
  onClose: () => void;
}) => {
  const [isReady, setIsReady] = useState(false);

  const handlePlayerReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const playTrailerBtnStyle = `absolute top-1 right-3 text-xl  ${
    isReady ? "opacity-1" : "opacity-0"
  }`;

  return (
    <div className={`absolute inset-0 grid w-full h-screen place-items-center`}>
      <div className={`relative w-full lg:w-3/4 h-2/3 `}>
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          url={videoSrc}
          onReady={handlePlayerReady}
        />
        <button onClick={handleClose} className={playTrailerBtnStyle}>
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default MovieTrailerPlayer;
