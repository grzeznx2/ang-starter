import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../model/book.model';
import { CallState, CALL_STATE } from '../../../core/call-state.enum';

export interface BooksListState extends EntityState<Book> {
  callState: CallState;
}

export const booksAdapter = createEntityAdapter<Book>();

export const initialState: BooksListState = booksAdapter.getInitialState({
  callState: CALL_STATE.INITIAL,
});
