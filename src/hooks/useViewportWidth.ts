import { useState, useEffect } from "react";

export const useViewportWidth = (threshold = 1000) => {
  const [isViewportWide, setIsViewportWide] = useState(
    window.innerWidth > threshold,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsViewportWide(window.innerWidth > threshold);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [threshold]);

  return isViewportWide;
};
