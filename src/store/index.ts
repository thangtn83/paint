import { configureStore } from '@reduxjs/toolkit';
import { Stroke } from '../types';
import strokesReducer from './slices/strokesSlice';
import currentStrokeReducer from './slices/currentStroke';
import stepHistoryReducer from './slices/stepHistorySlice';

export type RootState = {
  currentStroke: Stroke;
  strokes: Stroke[];
  indexHistory: number;
};

export const store = configureStore({
  reducer: {
    strokes: strokesReducer,
    currentStroke: currentStrokeReducer,
    stepHistory: stepHistoryReducer,
  },
});

export type AppDispatch = ReturnType<typeof store.dispatch>;
