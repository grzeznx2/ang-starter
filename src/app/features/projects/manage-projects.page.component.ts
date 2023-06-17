import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { map, filter } from 'rxjs';
import { RemoveDialogComponent } from 'src/app/shared/ui/common-remove-dialog.component';
import { ProjectsApiService } from './data-access/projects.api.service';
import { Project } from './model/project.model';
import { ProjectsStateService } from './data-access/projects.state.service';

@Component({
  selector: 'app-manage-projects-page',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatDialogModule, NgIf, MatButtonModule],
  template: `
    <header>
      <h2>Konkursy konkursiki</h2>
    </header>
    <button mat-raised-button color="primary" (click)="goToProjectForm()">Dodaj</button>

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
          <button (click)="goToProjectForm(element)"><mat-icon>edit</mat-icon></button>
          <button (click)="remove(element)"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
})
export default class ManageProjectsPageComponent {
  service = inject(ProjectsApiService);
  stateService = inject(ProjectsStateService);
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

  remove(project: Project) {
    this.dialog
      .open(RemoveDialogComponent, {
        width: '250px',
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.service.delete(project.id).subscribe(console.log);
      });
  }

  goToProjectForm(project?: Project) {}
}
