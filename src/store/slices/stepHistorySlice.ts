import { createSlice } from '@reduxjs/toolkit';
import { endStroke } from '../sharedAction';
import { RootState } from '..';

const indexHistorySlice = createSlice({
  name: 'indexHistorySlice',
  initialState: 0,
  reducers: {
    undo(state) {
      return Math.max(state - 1, 0);
    },
    redo(state, action) {
      return Math.min(state + 1, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state) => {
      return (state += 1);
    });
  },
});

export const getStepHistory = (state: RootState) => state.indexHistory;
export const { undo, redo } = indexHistorySlice.actions;
export default indexHistorySlice.reducer;
