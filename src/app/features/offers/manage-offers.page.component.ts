import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AddOfferFormComponent } from './ui/add-offer-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OffersApiService } from './data-access/offers.api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgIf } from '@angular/common';
import { filter, map } from 'rxjs';
import { Offer } from './model/offer.model';
import { OfferFormDialogComponent } from './ui/offer-form-dialog.component';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import { OffersStateService } from './data-access/offers.state.service';

@Component({
  selector: 'app-manage-offers-page',
  standalone: true,
  imports: [MatTableModule, AddOfferFormComponent, MatIconModule, MatDialogModule, NgIf, MatButtonModule],
  template: `
    <header>
      <h2>Zarządzaj ofertami</h2>
    </header>
    <button mat-raised-button color="primary" (click)="openOfferForm()">Dodaj</button>

    <table *ngIf="dataSource() as data" mat-table [dataSource]="data" class="mat-elevation-z8">
      <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

      <!-- Position Column -->
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef>Lp</th>
        <td mat-cell *matCellDef="let element">{{ element.position }}</td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button (click)="openOfferForm(element)"><mat-icon>edit</mat-icon></button>
          <button (click)="remove(element)"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export default class ManageOffersPageComponent implements OnInit {
  service = inject(OffersApiService);
  stateService = inject(OffersStateService);
  displayedColumns: string[] = ['position', 'name', 'actions'];

  dataSource = toSignal(
    this.stateService.value$.pipe(
      map(data =>
        data.list.map((offer, index) => ({
          position: index + 1,
          ...offer,
        }))
      )
    )
  );

  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.service.getAll();
  }

  remove(offer: Offer) {
    this.dialog
      .open(RemoveDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.service.delete(offer.id).subscribe(console.log);
      });
  }

  openOfferForm(offer?: Offer) {
    this.dialog
      .open(OfferFormDialogComponent, {
        width: '500px',
        data: {
          offer: offer || null,
        },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(formValue => {
        if (offer) {
          this.service.update(offer.id, formValue).subscribe(console.log);
        } else {
          this.service.add(formValue).subscribe(console.log);
        }
      });
  }
}
