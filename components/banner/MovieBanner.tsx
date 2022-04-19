import React, { useState } from "react";
import Image from "next/image";
import { toBase64 } from "lib/utils";
import { shimmerEffect } from "lib/effects";

type Props = {
  backdropImageSrc: string;
  height: number;
  backgroundOpacity: number;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const MovieBanner = ({
  backdropImageSrc,
  className = "",
  children,
  height,
  backgroundOpacity,
  style = {},
}: Props) => {
  const [isLoading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
  };

  const loadingClasses = (isLoading && "animate-pulse blur-md") || "";

  return (
    <div
      style={{ height: `${height}px`, ...style }}
      className={`relative ${loadingClasses} ${className}`}
    >
      <BackgroundImage
        backdropSrc={backdropImageSrc}
        opacity={backgroundOpacity}
        onLoad={handleLoading}
      />
      <div className="absolute inset-x-0 h-full">{children}</div>
    </div>
  );
};

const BackgroundImage = ({
  backdropSrc,
  opacity,
  onLoad,
}: {
  backdropSrc: string;
  opacity: number;
  onLoad: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
    onLoad();
  };

  return (
    <Image
      src={backdropSrc}
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      style={{ opacity: isLoading ? 0.5 : opacity }}
      className={`transition-opacity duration-200`}
      placeholder="blur"
      onLoadingComplete={handleLoading}
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmerEffect(700, 475)
      )}`}
      priority
    />
  );
};

export default MovieBanner;
