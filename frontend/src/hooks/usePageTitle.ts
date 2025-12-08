import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePageTitle = (title: string) => {
  const location = useLocation();

  useEffect(() => {
    document.title = `${title} | AnaMdTech`;
    window.scrollTo(0, 0); // Bonus: Auto-scroll to top on page change
  }, [location, title]);
};
