import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { booksListReducer } from './features/books/state/books-list.reducer';
import * as BooksListEffects from './features/books/state/books-list.effects';
import { AppState } from './core/app-state.model';
import { MatNativeDateModule } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(MatNativeDateModule),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideStore<AppState>({ booksList: booksListReducer }),
    provideEffects(BooksListEffects),
    provideRouterStore(),
  ],
};
