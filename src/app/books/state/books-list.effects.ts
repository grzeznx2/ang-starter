import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadBooksList, loadBooksListSuccess } from './books-list.actions';
import {tap, map, delay} from 'rxjs'


@Injectable()
export class BooksListEffects {

  loadList$ = createEffect(() => this.actions$.pipe(
    ofType(loadBooksList),
    delay(2000),
    map(()=>loadBooksListSuccess())
  )
  )
  constructor(
    private actions$: Actions,
  ) {}
}
