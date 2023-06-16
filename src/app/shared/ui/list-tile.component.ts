import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-tile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: ` <div class="p-4 shadow-md"><ng-content /></div> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTileComponent {}
