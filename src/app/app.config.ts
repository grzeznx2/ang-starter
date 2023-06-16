import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { booksListReducer } from './books/state/books-list.reducer';
import { BooksListEffects } from './books/state/books-list.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideStore({ booksList: booksListReducer }),
    provideEffects(BooksListEffects),
    provideRouterStore(),
  ],
};
