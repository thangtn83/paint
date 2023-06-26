import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { endStroke } from '../sharedAction';

const initialState: RootState['strokes'] = [];
const strokesSlice = createSlice({
  name: 'strokes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(endStroke, (state, action) => {
      const { stroke, stepIndex } = action.payload;
      return [...state.slice(0, stepIndex), stroke];
    });
  },
});

export const getStrokes = (state: RootState) => state.strokes;
export default strokesSlice.reducer;
