import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Book } from "../interfaces/book.interface";
import { CallState } from "../interfaces/callState.type";
import { createReducer, on } from "@ngrx/store";
import { loadBooksList, loadBooksListSuccess } from "./books-list.actions";

export interface BooksListState extends EntityState<Book> {
  callState: CallState
}

export const booksAdapter = createEntityAdapter<Book>();

export const initialState: BooksListState = booksAdapter.getInitialState({
  callState: 'INITIAL'
});

export const booksListReducer = createReducer(initialState,
  on(loadBooksList, state=>({...state, callState: 'LOADING' as CallState})),
  on(loadBooksListSuccess, state=>({...state, callState: 'LOADED' as CallState})),
  );
