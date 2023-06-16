import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';

@Component({
  selector: 'app-ngo-list-page',
  standalone: true,
  imports: [CommonModule, ListShellComponent],
  template: `
    <app-list-shell listName="Ngo's" [list]="[{ name: 'yo' }, { name: 'siema' }]">
      <div #filters>filtry</div>
      <ng-template #item let-item>
        <div>jestem wzorem {{ item.name }}</div>
      </ng-template>
    </app-list-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoListPageComponent {}
