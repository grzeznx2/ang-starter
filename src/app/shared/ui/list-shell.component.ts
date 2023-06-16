import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-shell',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  template: `
    <header>
      <ng-content #filters></ng-content>
    </header>
    <section>
      <h4>{{ listName }}</h4>
      <!-- TODO: kafelek jako komponent -->
      <div *ngFor="let item of list" class="border">
        <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }" />
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
