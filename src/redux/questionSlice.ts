import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QUESTIONS } from "../constants/questions";
import {
  MultiChoiceQuestion,
  MultiPointQuesion,
  Question,
  SingleChoiceQuestion,
} from "../types";
import { RootState } from "./store";

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
  state: Record<number, Question>,
  { questionId, answerId }: TogglePayload,
  expectedType: "singlechoice" | "multichoice"
) {
  const question = state[questionId];
  checkExists(question, questionId);
  checkType(question, expectedType);
  checkAnswerId(question as SingleChoiceQuestion, answerId);
  return { question, answerId };
}

function checkExists(q: Question | undefined, id: number) {
  if (q !== undefined) return;
  throw `Couldn't find a question with id=${id}`;
}

function checkType(q: Question, type: Question["type"]) {
  if (q.type === type) return;
  throw `An attempt was made to submit answer to question with id=${q.id}. Expected that question to be of type ${type}, but it was ${q.type} instead.`;
}

function checkAnswerId(
  q: MultiChoiceQuestion | SingleChoiceQuestion,
  answerId: number
) {
  if (q.answers.length > answerId) return;
  throw `Cannot toggle answerId=${answerId}, because max id for questionId=${q.id} is ${q.answers.length}`;
}

function checkSubquestionId(
  q: MultiPointQuesion,
  { subquestionId }: MultiPointPayload
) {
  if (q.subquestions.length > subquestionId) return;
  throw `Cannot toggle answer for questionId=${q.id} subquestionId=${subquestionId}, because this question has only ${q.subquestions.length} subquestions`;
}

function checkOptionId(q: MultiPointQuesion, { optionId }: MultiPointPayload) {
  if (q.options.length > optionId) return;
  throw `Cannot toggle answer for questionId=${q.id} option=${optionId}, because this question has only ${q.options.length} options`;
}

function getInitState(): Record<number, Question> {
  const state: Record<number, Question> = {};
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
      else if (q.maxNoOfAnswers && q.maxNoOfAnswers <= q.pickedAnswer.length)
        console.log("cant add answer");
      else q.pickedAnswer.push(answerId);
    },

    toggleMultiPoint(state, { payload }: MultiPointAnswer) {
      const question = state[payload.questionId] as MultiPointQuesion;
      checkExists(question, payload.questionId);
      checkType(question, "multipoint");
      checkSubquestionId(question, payload);
      checkOptionId(question, payload);

      const { subquestionId, optionId } = payload;
      if (question.pickedAnswer[subquestionId] === optionId) {
        delete question.pickedAnswer[subquestionId];
      } else question.pickedAnswer[subquestionId] = optionId;
    },
  },
});

export const { toggleSingleChoice, toggleMultiChoice, toggleMultiPoint } =
  questionSlice.actions;

export const selectQuestion = (questionId: number) => (state: RootState) => {
  const question = state.questions[questionId];
  if (question === undefined)
    throw `No question with id ${questionId} was found`;
  return question;
};

export default questionSlice.reducer;
