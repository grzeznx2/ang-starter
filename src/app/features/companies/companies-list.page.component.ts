import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesApiService } from './data-access/companies.api.service';
import { CompaniesStateService } from './data-access/companies.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';

@Component({
  selector: 'app-companies.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="MŚP" [list]="state.list">
        <div #filters>filtry</div>
        <ng-template #item let-company>
          <div>{{ company.name }}</div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompaniesListPageComponent implements OnInit {
  service = inject(CompaniesApiService);
  state = inject(CompaniesStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }
}
