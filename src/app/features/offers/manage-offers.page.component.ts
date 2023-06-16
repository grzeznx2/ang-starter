import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AddOfferFormComponent } from './ui/add-offer-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddOfferFormValue, OffersApiService } from './data-access/offers.api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  template: `
    <h1 mat-dialog-title>Usuwanie</h1>
    <div mat-dialog-content>Czy na pewno chcesz usunąć? Nie możesz cofnąć tej czynności</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Nie</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Tak</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class RemoveDialogComponent {
  dialogRef = inject<MatDialogRef<RemoveDialogComponent>>(MatDialogRef);
}

@Component({
  selector: 'app-manage-offers-page',
  standalone: true,
  imports: [MatTableModule, AddOfferFormComponent, MatIconModule, MatDialogModule],
  template: `
    <header>
      <h2>Konkursy konkursiki</h2>
    </header>
    <app-add-offer-form (add)="addOffer($event)" />

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
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

      <ng-container matColumnDef="xd">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button (click)="edit(element)"><mat-icon>edit</mat-icon></button>
          <button (click)="remove(element)"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export default class ManageOffersPageComponent {
  displayedColumns: string[] = ['position', 'name', 'xd'];
  dataSource = ELEMENT_DATA;

  dialog = inject(MatDialog);

  service = inject(OffersApiService);

  edit(el: PeriodicElement) {}

  remove(el: PeriodicElement) {
    this.dialog
      .open(RemoveDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .subscribe(console.log);
  }

  addOffer(payload: AddOfferFormValue) {
    this.service.add(payload).subscribe(console.log);
  }
}
