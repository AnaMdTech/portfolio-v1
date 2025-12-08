import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "Instant" moves it immediately. "Smooth" looks nice but can be annoying on long pages.
    // Let's use instant for navigation to feel snappy.
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
