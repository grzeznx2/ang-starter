import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NGOsStateService } from './data-access/ngos.state.service';

@Component({
  selector: 'app-ngo-list-page',
  standalone: true,
  imports: [CommonModule, ListShellComponent],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Ngo's" [list]="state.list">
        <div #filters>filtry</div>
        <ng-template #item let-ngo>
          <div>{{ ngo.name }}</div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoListPageComponent implements OnInit {
  service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }
}
