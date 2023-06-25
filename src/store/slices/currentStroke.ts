import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { endStroke } from '../sharedAction';

const initialState: RootState['currentStroke'] = {
  points: [],
  color: '#000',
};

const currentStroke = createSlice({
  name: 'currenStroke',
  initialState,
  reducers: {
    beginStroke(state, action) {
      state.points = [action.payload];
    },
    updateStroke(state, action) {
      state.points.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state) => {
      state.points = [];
    });
  },
});

export const getCurrentStroke = (state: RootState) => state.currentStroke;
export const { beginStroke, updateStroke } = currentStroke.actions;
export default currentStroke.reducer;
