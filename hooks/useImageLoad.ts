import { useEffect, useState } from "react";

const useImageLoad = (imageSrc?: string | null) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (imageSrc) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [imageSrc]);

  return { isLoading, handleLoadingComplete };
};

export default useImageLoad;
