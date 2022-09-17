export const PAGES = [
  "Zaczynamy",
  "O tobie",
  "Ocena powietrza",
  "Energetyka i Ogrzewanie",
  "Transport",
  "Kończymy",
] as const;

export const START_PAGE = PAGES[0];
export const END_PAGE = PAGES[PAGES.length - 1];
export const QUESTION_PAGES = PAGES.slice(1, -1);
export const FIRST_QUESTION_PAGE = QUESTION_PAGES[0];
