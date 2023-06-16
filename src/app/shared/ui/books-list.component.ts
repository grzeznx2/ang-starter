import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListTileComponent } from './list-tile.component';
import { ListShellComponent } from './list-shell.component';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, ListTileComponent, ListShellComponent],
  template: `
    <ng-template #booksTemplate let-books>
      <label>{{ books.name }}</label>
    </ng-template>

    <app-list-shell listName="books" [list]="list" [optionTemplateRef]="booksTemplate"></app-list-shell>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {
  list = [{ name: 'ABC' }, { name: 'CDE' }, { name: 'DEF' }, { name: 'GHI' }];
}
