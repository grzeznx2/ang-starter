import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-tile',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, MatCardModule],
  template: ` <div class="p-4 shadow-md"><ng-content /></div> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTileComponent {}
