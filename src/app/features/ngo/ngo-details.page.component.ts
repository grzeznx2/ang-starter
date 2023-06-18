import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { NGOsApiService } from './data-access/ngos.api.service';
import { NGOsStateService } from './data-access/ngos.state.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesApiService } from '../messages/data-access/messages.api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent, MessageDialogFormValue } from 'src/app/shared/ui/common-message-dialog.component';
import { take, tap } from 'rxjs';
import { ListDialogComponent } from 'src/app/shared/ui/common-list-dialog.component';
import { LegalStatusPipe } from './utils/legal-status.pipe';
import { ContactDialogComponent } from 'src/app/shared/ui/common-contact-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ngo-details-page',
  standalone: true,
  imports: [
    CommonModule,
    ListShellComponent,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    SlicePipe,
    LegalStatusPipe,
  ],
  template: `
    <ng-container *ngIf="state() as state">
      <section *ngIf="state.loadListCallState === 'LOADED'">{{ state.details?.name }}</section>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoDetailsPageComponent implements OnInit {
  // snackbar = inject(MatSnackBar);
  route = inject(ActivatedRoute);
  messagesService = inject(MessagesApiService);

  service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;
  // dialog = inject(MatDialog);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.getById(id);
  }
}
