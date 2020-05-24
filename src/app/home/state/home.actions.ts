import {createAction, props} from '@ngrx/store';
import { Character } from '../models/character';
import { Filter } from '../models/filter';

export const loadAllCharacters = createAction(
    "[Load Characters Effect] Load All Characters"
);

export const allCharactersLoaded = createAction(
    "[Load Characters Effect] All Characters Loaded",
    props<{characters: Character[]}>()
);

export const updateFilter = createAction(
  "[UI Filter] chanage",
  props<{filters: Filter}>()
);
