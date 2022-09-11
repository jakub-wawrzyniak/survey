import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QUESTIONS } from "../constants/questions";
import { MultiChoiceQuestion, Question, SingleChoiceQuestion } from "../types";
import { RootState } from "./store";

type TogglePayload = {
  questionId: number;
  answerId: number;
};
type SingleChoiceAnswer = PayloadAction<TogglePayload>;
type MultiChoiceAnswer = SingleChoiceAnswer;
type MultiPointAnswer = PayloadAction<{
  questionId: number;
  subquestionId: number;
  optionId: number;
}>;

function validateToggleAction(
  state: Record<number, Question>,
  payload: TogglePayload,
  expectedType: "singlechoice" | "multichoice"
) {
  const { questionId, answerId } = payload;
  const question = state[questionId];
  if (question === undefined)
    throw `Couldn't find a question with id=${questionId}`;
  if (question.type !== expectedType)
    throw `An attempt was made to toggle a question with id=${questionId}. Expected that question to be of type ${expectedType}, but it was ${question.type} instead.`;
  if (question.answers.length <= answerId)
    throw `Cannot toggle answerId=${answerId}, because max id for questionId=${questionId} is ${question.answers.length}`;
  return { question, answerId };
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
      const { question, answerId } = validateToggleAction(
        state,
        payload,
        "singlechoice"
      );

      if (question.pickedAnswer === answerId) question.pickedAnswer = null;
      else question.pickedAnswer = answerId;
    },

    toggleMultiChoice(state, { payload }: MultiChoiceAnswer) {
      const { question, answerId } = validateToggleAction(
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
  },
});

export const { toggleSingleChoice, toggleMultiChoice } = questionSlice.actions;

export const selectQuestion = (questionId: number) => (state: RootState) => {
  const question = state.questions[questionId];
  if (question === undefined)
    throw `No question with id ${questionId} was found`;
  return question;
};

export default questionSlice.reducer;
