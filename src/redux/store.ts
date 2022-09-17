import { configureStore } from "@reduxjs/toolkit";
import questions from "./questionSlice";
import metadata from "./metadataSlice";

export const store = configureStore({
  reducer: {
    questions,
    metadata,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
