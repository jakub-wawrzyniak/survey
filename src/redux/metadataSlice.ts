import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { QUESTION_PAGES } from "../constants";
import { Page } from "../types";
import { RootState } from "./store";

type LogPageAction = PayloadAction<{
  newPage: Page;
  timestamp: number;
}>;

export const submitAnswers = createAsyncThunk<void, void, { state: RootState }>(
  "metadata/sumbitAnswers",
  async (_, thunkAPI) => {
    const firebase = await import("../firebase/config");
    const state = thunkAPI.getState();
    await firebase.submitAnswers(state);
  }
);

type State = {
  answerTimeMS: 0;
  enteredQuestionsAt: null | number;
  sumbitionState: "notSent" | "rejected" | "submited" | "pending";
};

const initialState: State = {
  answerTimeMS: 0,
  enteredQuestionsAt: null,
  sumbitionState: "notSent",
};

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
  extraReducers(builder) {
    builder.addCase(submitAnswers.pending, (state) => {
      state.sumbitionState = "pending";
    });
    builder.addCase(submitAnswers.rejected, (state) => {
      state.sumbitionState = "rejected";
    });
    builder.addCase(submitAnswers.fulfilled, (state) => {
      state.sumbitionState = "submited";
    });
  },
});

export const selectAnswerTime = (state: RootState) => {
  return state.metadata.answerTimeMS / 1000;
};

export const selectSubmitionState = (state: RootState) => {
  return state.metadata.sumbitionState;
};

export const { logPageChange } = metadataSlice.actions;
export default metadataSlice.reducer;
