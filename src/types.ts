import { PAGES } from "./constants/pages";

type AnswerSlice = string;
export type Length = "short" | "medium" | "long";
export type Page = typeof PAGES[number];

export type QuestionMetadata = {
  id: number;
  page: Page;
  title: string;
  showIf: (answers: AnswerSlice) => boolean;
};

export type SingleChoiceQuestion = QuestionMetadata & {
  type: "singlechoice";
  length: Length;
  answers: string[];
  /** ID of picked option */
  pickedAnswer: number | null;
};

export type MultiChoiceQuestion = QuestionMetadata & {
  type: "multichoice";
  length: Length;
  answers: string[];
  maxNoOfAnswers?: number;
  /** IDs of picked options */
  pickedAnswer: number[];
};

export type MultiPointQuesion = QuestionMetadata & {
  type: "multipoint";
  subquestions: string[];
  options: string[];
  /** { subquestionId: optionId } key-value pairs */
  pickedAnswer: Record<number, number>;
};

export type Question =
  | MultiChoiceQuestion
  | MultiPointQuesion
  | SingleChoiceQuestion;

export type PageData = {
  pageId: number;
  pageName: Page;
  nextPageUrl?: string;
  prevPageUrl?: string;
};
export type PageRecord = Record<Page, PageData>;

export type Nestable = {
  children: React.ReactNode;
};
