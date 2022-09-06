import { PAGES } from "../constants";
import { Page, PageData, PageRecord } from "../types";
import { getUrlFromPage } from "../utils";

function getPageRecord(): PageRecord {
  const data: Partial<PageRecord> = {};
  PAGES.forEach((pageName, pageId) => {
    const pageData: PageData = { pageId, pageName };

    const isLastPage = pageId === PAGES.length - 1;
    if (!isLastPage) {
      const nextPage = PAGES[pageId + 1];
      pageData.nextPageUrl = getUrlFromPage(nextPage);
    }

    const isFirstPage = pageId === 0;
    if (!isFirstPage) {
      const prevPage = PAGES[pageId - 1];
      pageData.prevPageUrl = getUrlFromPage(prevPage);
    }

    data[pageName] = pageData;
  });

  return data as PageRecord;
}

export const PAGE_RECORD = getPageRecord();
