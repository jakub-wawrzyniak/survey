import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QUESTIONS } from "../constants/questions";
import { Question } from "../types";
import { RootState } from "./store";

type ToggleAnswerAction = PayloadAction<{
  id: number;
  pickedAnswer:
    | number // When the type of the question is singlechoice or multichoice
    | {
        // When the question type is multipoint
        subquestionId: number;
        optionId: number;
      };
}>;

function getInitState(): Record<number, Question> {
  const state: Record<number, Question> = {};
  QUESTIONS.forEach((q) => (state[q.id] = q));
  return state;
}

const questionSlice = createSlice({
  name: "questions",
  initialState: getInitState(),
  reducers: {
    toggleAnswer(state, { payload }: ToggleAnswerAction) {},
  },
});

export const { toggleAnswer } = questionSlice.actions;

export const selectQuestion = (questionId: number) => (state: RootState) => {
  const question = state.questions[questionId];
  if (question === undefined)
    throw `No question with id ${questionId} was found`;
  return question;
};

export default questionSlice.reducer;
