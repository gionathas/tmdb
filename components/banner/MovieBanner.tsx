import useImageLoad from "hooks/useImageLoad";
import { shimmerEffect } from "lib/effects";
import { toBase64 } from "lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  backdropImageSrc: string | null;
  height: number;
  backgroundOpacity: number;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const MovieBanner = ({
  backdropImageSrc,
  className = "",
  children,
  height,
  backgroundOpacity,
  style = {},
  onClick: handleClick,
}: Props) => {
  return (
    <div
      style={{ height: `${height}px`, ...style }}
      className={`relative ${className}`}
      onClick={handleClick}
    >
      {backdropImageSrc && (
        <BackgroundImage
          backdropSrc={backdropImageSrc}
          opacity={backgroundOpacity}
        />
      )}

      <div className="absolute inset-x-0 h-full">{children}</div>
    </div>
  );
};

const BackgroundImage = ({
  backdropSrc,
  opacity,
}: {
  backdropSrc: string;
  opacity: number;
}) => {
  const {
    isLoading: isImageLoading,
    handleLoadingComplete: handleImageLoadingComplete,
  } = useImageLoad(backdropSrc);

  return (
    <Image
      src={backdropSrc}
      layout="fill"
      objectFit="cover"
      alt="Movie Background Image"
      objectPosition="center"
      style={{ opacity: isImageLoading ? 0 : opacity }}
      className={`transition-opacity duration-300`}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmerEffect(700, 475)
      )}`}
      onLoadingComplete={handleImageLoadingComplete}
      priority
    />
  );
};

export default MovieBanner;
