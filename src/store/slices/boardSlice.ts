import { Stroke } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

type BoardState = {
  currentStroke: Stroke;
  strokes: Stroke[];
};

const initialState: BoardState = {
  currentStroke: {
    points: [],
    color: '#000',
  },
  strokes: [],
};

const boardSlice = createSlice({
  name: 'Board',
  initialState,
  reducers: {
    beginStroke(state, action) {
      state.currentStroke.points = [action.payload];
    },
    updateStroke(state, action) {
      state.currentStroke.points.push(action.payload);
    },

    endStroke(state) {
      state.currentStroke.points = [];
      state.strokes.push(state.currentStroke);
    },
  },
});

export const getCurrentStroke = (state: BoardState): Stroke =>
  state.currentStroke;
export const { beginStroke, updateStroke, endStroke } = boardSlice.actions;
export default boardSlice.reducer;
