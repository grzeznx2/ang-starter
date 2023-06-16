import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { booksListActions } from '../books/state/books-list.actions';
import { selectBooksListCallState } from '../books/state/books-list.selectors';

@Component({
  selector: 'app-testcomp',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './testcomp.component.html',
  styleUrls: ['./testcomp.component.scss'],
})
export class TestcompComponent {
  callState$ = this.store.select(selectBooksListCallState);
  callStateSignal = this.store.selectSignal(selectBooksListCallState);

  constructor(private store: Store) {}

  loadBooks() {
    this.store.dispatch(booksListActions.loadList());
  }
}
