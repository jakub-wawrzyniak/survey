import { PAGES, START_PAGE } from "../constants/pages";
import { Page } from "../types";

export function getUrlFromPage(pageName: Page) {
  const urlPage = pageName.toLowerCase();
  const encodedPage = encodeURI(urlPage);
  return `/pytania/${encodedPage}`;
}

export function getPageFromUrl(url: string): Page {
  let page = PAGES.find((p) => getUrlFromPage(p) === url);
  page ??= START_PAGE;
  return page;
}
