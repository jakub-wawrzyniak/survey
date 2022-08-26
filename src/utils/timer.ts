import { PAGES } from "../constants/pages";

/**
 * Should we log time when switching between these two pages? The first and last
 * pages are welcome / goodbye pages, so the time shouldn't be counted then
 */
export function shouldLogTime(page1: string, page2: string): boolean {
  /** Is the page first / last, or somewhere in the middle? */
  const isEdge = (page: string) => {
    const isFirst = PAGES[0] === page;
    const isLast = PAGES[PAGES.length - 1] === page;
    return isFirst || isLast;
  };

  return isEdge(page1) !== isEdge(page2);
}
