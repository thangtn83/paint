import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";

const rootReducer = {
  board: boardReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
