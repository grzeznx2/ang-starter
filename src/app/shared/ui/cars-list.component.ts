import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ListTileComponent } from './list-tile.component';
import { ListShellComponent } from './list-shell.component';

@Component({
  selector: 'app-list-cars',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, ListTileComponent, ListShellComponent],
  template: `
    <ng-template #carsTemplate let-cars>
      <label>{{ cars.type }}</label>
      <p>{{ cars.age }}</p>
    </ng-template>

    <app-list-shell listName="cars" [list]="list" [optionTemplateRef]="carsTemplate"></app-list-shell>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsListComponent {
  list = [
    { type: 'AUDI', age: 21 },
    { type: 'BMW', age: 2 },
    { type: 'OPEL', age: 44 },
    { type: 'MULTIPLA', age: 8 },
  ];
}
