import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListTileComponent } from './list-tile.component';

@Component({
  selector: 'app-list-shell',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, ListTileComponent],
  template: `
    <header>
      <ng-content #filters></ng-content>
    </header>
    <section>
      <h4>{{ listName }}</h4>
      <div class="flex flex-wrap">
        <app-list-tile *ngFor="let item of list" class="px-4 pb-4 w-1/3">
          <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }" />
        </app-list-tile>
      </div>
    </section>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListShellComponent<T> {
  @Input({ required: true }) listName!: string;
  @Input({ required: true }) list!: T[];

  @ContentChild('item') itemTemplate!: TemplateRef<any>;
}
