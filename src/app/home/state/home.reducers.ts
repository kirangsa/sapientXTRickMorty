import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Character } from '../models/character';
import { HomeActions } from './action-types';
import { Filter } from '../models/filter';

export interface HomeState extends EntityState<Character> {
  allCharecterLoaded: boolean;
  filter: Filter;
}

export const adapter = createEntityAdapter<Character>({});

export const initialHomeState = adapter.getInitialState({
  allCharactersLoaded: false,
  filter: {
    species: [],
    gender: [],
    origin: [],
  },
});

export const characterReducers = createReducer(
  initialHomeState,
  on(HomeActions.allCharactersLoaded, (state, action) =>
    adapter.addAll(action.characters, { ...state, allCharecterLoaded: true })
  ),
  on(HomeActions.updateFilter, (state, action) => {
    return { ...state, filter: action.filters };
  })
);

export const { selectAll } = adapter.getSelectors();
