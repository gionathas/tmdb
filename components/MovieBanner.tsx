import React, { useState } from "react";
import Image from "next/image";
import { toBase64 } from "lib/utils";

type Props = {
  backdropImageSrc: string;
  height: number;
  opacity: number;
  className?: string;
  children: React.ReactNode;
};

const MovieBanner = ({
  backdropImageSrc,
  className,
  children,
  height,
  opacity,
}: Props) => {
  const [isLoading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <div
      style={{ height: `${height}px` }}
      className={`relative ${className} ${
        isLoading && "animate-pulse blur-md"
      }`}
    >
      <BackgroundImage
        backdropSrc={backdropImageSrc}
        opacity={opacity}
        onLoad={handleLoading}
      />
      <div className="absolute top-0 h-full">{children}</div>
    </div>
  );
};

const shimmerEffect = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

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
