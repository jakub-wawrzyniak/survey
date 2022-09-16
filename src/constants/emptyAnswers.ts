export const EMPTY_ANSWERS = {
  singlechoice: () => null,
  multichoice: () => [],
  multipoint: () => ({}),
} as const;
