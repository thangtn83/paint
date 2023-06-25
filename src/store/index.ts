import { configureStore } from '@reduxjs/toolkit';
import { Stroke } from '../types';
import strokesReducer from './slices/strokesSlice';
import currentStrokeReducer from './slices/currentStroke';

export type RootState = {
  currentStroke: Stroke;
  strokes: Stroke[];
};

export const store = configureStore({
  reducer: {
    strokes: strokesReducer,
    currentStroke: currentStrokeReducer,
  },
});

export type AppDispatch = ReturnType<typeof store.dispatch>;
