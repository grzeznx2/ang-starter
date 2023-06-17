import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersApiService } from './data-access/offers.api.service';
import { OffersStateService } from './data-access/offers.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-offers.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent, MatIconModule, MatDividerModule, MatTooltipModule],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Oferty" [list]="state.list">
        <div #filters>filtry</div>
        <ng-template #item let-offer>
          <div class="">
            <div class="flex justify-between">
              <p *ngIf="offer.closeDeadline"><mat-icon>warning</mat-icon> Wniosek zamyka się wkrótce</p>
              <mat-icon class="text-red-600 ml-auto">favorite</mat-icon>
            </div>

            <div class="rounded-md w-fit px-2 mt-4 mb-2 bg-green-400 text-green-900">
              {{ offer.scope }}
            </div>
            <p class="font-semibold text-lg">{{ offer.name }}</p>
            <p class="line-clamp-3">{{ offer.description }}</p>
            <a [href]="offer.link" class="text-blue-600">Przejdź do szczegółów konkursu</a>
            <mat-divider />
            <div class="flex justify-end mt-4">
              <!-- <div class="flex flex-col"><mat-icon>paid</mat-icon> {{ project.budget }}</div>
              <div *ngIf="project.possibleVolunteer" class="flex flex-col">
                <mat-icon>accessibility new</mat-icon>
              </div>
              <div *ngIf="project.cooperationMessage" class="flex flex-col">
                <mat-icon [matTooltip]="project.cooperationMessage">spatial_audio_off</mat-icon>
              </div> -->
              <div class="flex flex-col"><mat-icon>forward_to_inbox</mat-icon></div>
            </div>
          </div>
        </ng-template>
        <!-- <ng-template #item let-offer>
          <div>{{ offer.name }}</div>
        </ng-template> -->
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
