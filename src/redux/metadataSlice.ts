import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QUESTION_PAGES } from "../constants";
import { Page } from "../types";
import { RootState } from "./store";

type State = {
  answerTimeMS: 0;
  enteredQuestionsAt: null | number;
};

const initialState: State = {
  answerTimeMS: 0,
  enteredQuestionsAt: null,
};

type LogPageAction = PayloadAction<{
  newPage: Page;
  timestamp: number;
}>;

const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    logPageChange(state, { payload }: LogPageAction) {
      const { newPage, timestamp } = payload;
      if (QUESTION_PAGES.includes(newPage)) {
        state.enteredQuestionsAt ??= timestamp;
      } else if (state.enteredQuestionsAt) {
        state.answerTimeMS += timestamp - state.enteredQuestionsAt;
        state.enteredQuestionsAt = null;
      }
    },
  },
});

export const selectAnswerTime = (state: RootState) => {
  return state.metadata.answerTimeMS / 1000;
};

export const { logPageChange } = metadataSlice.actions;
export default metadataSlice.reducer;
