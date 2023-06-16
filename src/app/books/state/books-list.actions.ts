import { createActionGroup, emptyProps } from '@ngrx/store';

export const booksListActions = createActionGroup({
  source: '[Books]',
  events: {
    'Load List': emptyProps(),
    'Load List Success ': emptyProps(),
  },
});
