import { Stroke } from "../../types";
import { createSlice } from "@reduxjs/toolkit";

type BoardState = {
  currentStroke: Stroke;
  strokes: Stroke[];
};

const initialState: BoardState = {
  currentStroke: {
    points: [],
    color: "#CCC",
  },
  strokes: [],
};

const boardSlice = createSlice({
  name: "Board",
  initialState,
  reducers: {
    startStroke(state, action) {
      state.strokes = [action.payload];
    },
  },
});

export default boardSlice.reducer;
