import cn from "classnames";
import { shimmerEffect } from "lib/effects";
import { toBase64 } from "lib/utils";
import Image from "next/image";
import React, { useState } from "react";

type OwnProps = {
  backdropImageSrc: string | null;
  height: number;
  backgroundOpacity: number;
  children?: React.ReactNode;
  onLoadingComplete?: () => void;
};

type MovieBannerProps = OwnProps &
  Omit<React.ComponentPropsWithoutRef<"div">, keyof OwnProps>;

const MovieBanner = ({
  backdropImageSrc,
  className,
  children,
  height,
  backgroundOpacity,
  style = {},
  ...rest
}: MovieBannerProps) => {
  const [isBackgroundLoading, setIsBackgroundLoading] = useState(
    backdropImageSrc ? true : false
  );

  return (
    <div
      style={{ height: `${height}px`, ...style }}
      className={cn("relative", className)}
      {...rest}
    >
      {backdropImageSrc && (
        <Image
          src={backdropImageSrc}
          layout="fill"
          objectFit="cover"
          alt="Movie Background Image"
          objectPosition="center"
          style={{ opacity: isBackgroundLoading ? 0 : backgroundOpacity }}
          className={`transition-opacity duration-700`}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmerEffect(700, 475)
          )}`}
          onLoadingComplete={() => setIsBackgroundLoading(false)}
          priority
        />
      )}
      <div className="absolute inset-x-0 h-full">{children}</div>
    </div>
  );
};

export default MovieBanner;
