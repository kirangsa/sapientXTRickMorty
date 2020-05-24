import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeActions } from './action-types';
import { HttpService } from '../services/http.service';
import { concatMap, map, filter } from 'rxjs/operators';
import { allCharactersLoaded } from './home.actions';
import { Character } from '../models/character';

@Injectable()
export class HomeEffects {
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadAllCharacters),
      concatMap((action) => this.httpService.fetch()),
      map((characters: Character[]) => allCharactersLoaded({ characters }))
    )
  );
  constructor(private actions$: Actions, private httpService: HttpService) {}
}
