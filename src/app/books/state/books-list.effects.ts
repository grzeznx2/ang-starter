import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { booksListActions } from './books-list.actions';
import {tap, map, delay} from 'rxjs'


@Injectable()
export class BooksListEffects {

  loadList$ = createEffect(() => this.actions$.pipe(
    ofType(booksListActions.loadList),
    delay(2000),
    map(()=>booksListActions.loadListSuccess())
  )
  )
  constructor(
    private actions$: Actions,
  ) {}
}
