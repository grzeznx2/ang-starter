import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersApiService } from './data-access/offers.api.service';
import { OffersStateService } from './data-access/offers.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';

@Component({
  selector: 'app-offers.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Oferty" [list]="state.list">
        <div #filters>filtry</div>
        <ng-template #item let-offer>
          <div>{{ offer.name }}</div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OffersListPageComponent implements OnInit {
  service = inject(OffersApiService);
  state = inject(OffersStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }
}
