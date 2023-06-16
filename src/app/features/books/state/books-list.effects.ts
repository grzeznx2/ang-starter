import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { booksListActions } from './books-list.actions';
import { map, delay } from 'rxjs';

export const loadList$ = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(booksListActions.loadList),
      delay(2000),
      map(() => booksListActions.loadListSuccess())
    ),
  {
    functional: true,
  }
);
