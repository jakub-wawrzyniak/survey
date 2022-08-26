type AnswerSlice = string;
type Length = "short" | "medium" | "long";

type QuestionMetadata = {
  id: number;
  page: string;
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
