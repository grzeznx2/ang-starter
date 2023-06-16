import { CALL_STATE } from '../../../core/call-state.enum';
import { createReducer, on } from '@ngrx/store';
import { booksListActions } from './books-list.actions';
import { initialState } from './books-list.state';

export const booksListReducer = createReducer(
  initialState,
  on(booksListActions.loadList, state => ({ ...state, callState: CALL_STATE.LOADING })),
  on(booksListActions.loadListSuccess, state => ({ ...state, callState: CALL_STATE.LOADED })),
  on(booksListActions.loadListFailure, state => ({ ...state, callState: CALL_STATE.ERROR }))
);
