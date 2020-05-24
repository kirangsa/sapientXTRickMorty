import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducers';

import * as fromHome from './home.reducers';

export const selectHomeState = createFeatureSelector<HomeState>('characters');

export const selectAllCharacters = createSelector(
  selectHomeState,
  fromHome.selectAll
);

export const isLoading = createSelector(
  selectHomeState,
  (state) => state.allCharecterLoaded
);
