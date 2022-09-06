import { PAGES, START_PAGE } from "../constants/pages";
import { Page } from "../types";

const toReplace: Record<string, string> = {
  " ": "-",
  ",": "",
};

export const removeInvalidChars = (invalidUrl: string) => {
  let url = "";
  for (const oldChar of invalidUrl) {
    const newChar = toReplace[oldChar];
    // newChar == undefined means the oldChar doesn't have to be replaced
    url += newChar ?? oldChar;
  }
  return url;
};

export function getUrlFromPage(pageName: Page) {
  let pageUrl = pageName.toLowerCase();
  pageUrl = removeInvalidChars(pageUrl);
  pageUrl = encodeURI(pageUrl);
  return `/pytania/${pageUrl}`;
}

export function getPageFromUrl(url: string): Page {
  let page = PAGES.find((p) => getUrlFromPage(p) === url);
  page ??= START_PAGE;
  return page;
}
