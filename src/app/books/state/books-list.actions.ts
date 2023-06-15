import { createAction } from '@ngrx/store';

export const loadBooksList = createAction(
  '[Books] Load list',
);

export const loadBooksListSuccess = createAction(
  '[Books] Load list success',
);
