import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'store/rootState';

const selectDomain = (state: RootState) => state.direction;

export const selectDirection = createSelector(
  [selectDomain],
  (directionState) => directionState.direction,
);
