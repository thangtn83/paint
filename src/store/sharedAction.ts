import { Stroke } from '../types';
import { createAction } from '@reduxjs/toolkit';

export const endStroke = createAction<{ stroke: Stroke; stepIndex?: number }>(
  'endStroke'
);
