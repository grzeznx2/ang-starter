import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BooksListState } from "./books-list.reducer";

export const selectBooksListState = createFeatureSelector<BooksListState>('booksList');

export const selectBooksListCallState = createSelector(selectBooksListState, state => state.callState)
