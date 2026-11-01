import { useEffect } from "react";
import { SITE } from "../config/site";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : SITE.name;
  }, [title]);
};

export default usePageTitle;
