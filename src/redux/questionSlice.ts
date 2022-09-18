import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EMPTY_ANSWERS } from "../constants/emptyAnswers";
import { QUESTIONS } from "../constants/questions";
import { SHOW_QUESTION_IF } from "../constants/showQuestionsIf";
import {
  MultiChoiceQuestion,
  MultiPointQuestion,
  Question,
  QuestionRecord,
  SingleChoiceQuestion,
} from "../types";
import {
  checkAnswerId,
  checkExists,
  checkOptionId,
  checkSubquestionId,
  checkType,
} from "../utils";
import { isQuestionEmpty } from "../utils/questionHelpers";
import { RootState } from "./store";

type QuestionState = Pick<RootState, "questions">;
type TogglePayload = {
  questionId: number;
  answerId: number;
};
type SingleChoiceAnswer = PayloadAction<TogglePayload>;
type MultiChoiceAnswer = SingleChoiceAnswer;

type MultiPointPayload = {
  questionId: number;
  subquestionId: number;
  optionId: number;
};
type MultiPointAnswer = PayloadAction<MultiPointPayload>;

function validateAction(
  state: QuestionRecord,
  { questionId, answerId }: TogglePayload,
  expectedType: "singlechoice" | "multichoice"
) {
  const question = state[questionId];
  checkExists(question, questionId);
  checkType(question, expectedType);
  checkAnswerId(question as SingleChoiceQuestion, answerId);
  return { question, answerId };
}

function clearNotShownQuestions(state: QuestionRecord) {
  for (const { id } of QUESTIONS) {
    const question = state[id];
    const isShown = selectShouldShowQuestion(id)({ questions: state });
    if (!isShown) question.pickedAnswer = EMPTY_ANSWERS[question.type]();
  }
}

function getInitState(): QuestionRecord {
  const state: QuestionRecord = {};
  QUESTIONS.forEach((q) => (state[q.id] = q));
  return state;
}

const questionSlice = createSlice({
  name: "questions",
  initialState: getInitState(),
  reducers: {
    toggleSingleChoice(state, { payload }: SingleChoiceAnswer) {
      const { question, answerId } = validateAction(
        state,
        payload,
        "singlechoice"
      );

      if (question.pickedAnswer === answerId) question.pickedAnswer = null;
      else question.pickedAnswer = answerId;
      clearNotShownQuestions(state);
    },

    toggleMultiChoice(state, { payload }: MultiChoiceAnswer) {
      const { question, answerId } = validateAction(
        state,
        payload,
        "multichoice"
      );
      const q = question as MultiChoiceQuestion;

      const foundId = q.pickedAnswer.findIndex((ans) => ans === answerId);
      if (foundId >= 0) q.pickedAnswer.splice(foundId, 1);
      else if (q.maxNoOfAnswers && q.maxNoOfAnswers <= q.pickedAnswer.length) {
      } else q.pickedAnswer.push(answerId);
      clearNotShownQuestions(state);
    },

    toggleMultiPoint(state, { payload }: MultiPointAnswer) {
      const question = state[payload.questionId] as MultiPointQuestion;
      checkExists(question, payload.questionId);
      checkType(question, "multipoint");
      checkSubquestionId(question, payload);
      checkOptionId(question, payload);

      const { subquestionId, optionId } = payload;
      if (question.pickedAnswer[subquestionId] === optionId) {
        delete question.pickedAnswer[subquestionId];
      } else question.pickedAnswer[subquestionId] = optionId;
      clearNotShownQuestions(state);
    },
  },
});

export const { toggleSingleChoice, toggleMultiChoice, toggleMultiPoint } =
  questionSlice.actions;

export const selectQuestion =
  (questionId: number) => (state: QuestionState) => {
    const question = state.questions[questionId];
    checkExists(question, questionId);
    return question;
  };

export const selectShouldShowQuestion =
  (questionId: number) =>
  (state: QuestionState): boolean => {
    const showIf = SHOW_QUESTION_IF[questionId];
    if (showIf === undefined) return true;
    const shouldShow = showIf(state.questions);
    return shouldShow;
  };

export const selectHowManyAnswered = (state: QuestionState) => {
  return QUESTIONS.filter(({ id }) => {
    const question = selectQuestion(id)(state);
    return !isQuestionEmpty(question);
  }).length;
};

export default questionSlice.reducer;
