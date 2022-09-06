import { useLocation } from "react-router-dom";
import { PageData } from "../types";
import { getPageFromUrl } from "../utils";
import { PAGE_RECORD } from "./pageRecord";

export function usePage(): PageData {
  const { pathname } = useLocation();
  const pageName = getPageFromUrl(pathname);
  return PAGE_RECORD[pageName];
}
