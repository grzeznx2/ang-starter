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
import { NGOResourcesDialogComponent } from './ngo-resources-dialog.component';
import { NGOContactDialogComponent } from './ngo-contact-dialog.component';
import { ListDialogComponent } from 'src/app/shared/ui/common-list-dialog.component';
import { LegalStatusPipe } from './utils/legal-status.pipe';

@Component({
  selector: 'app-ngo-list-page',
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
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Ngo's" [list]="state.list">
        <div #filters>filtry</div>
        <ng-template #item let-ngo>
          <div class="mb-4">
            <p class="font-semibold text-lg">{{ ngo.name }}</p>
          </div>
          <div class="mb-4 relative">
            <img [src]="ngo.logo" />
            <div class="absolute bottom-0 left-0 w-full h-10 p-4 bg-green-500 text-white flex items-center">
              {{ ngo.legalStatus | legalStatus }}
            </div>
          </div>
          <div class="mb-4">
            <p>{{ (ngo.description | slice : 0 : 160) + '...' }}</p>
          </div>
          <mat-divider />
          <div class="flex justify-between mt-4">
            <div (click)="openMessageModal(ngo.id, ngo.name)">
              <mat-icon>forward_to_inbox</mat-icon>
            </div>
            <div (click)="openResourcesModal(ngo.resources)">
              <mat-icon>build</mat-icon>
            </div>
            <div (click)="openCategoriessModal(ngo.businnessAreas)">
              <mat-icon>assignment</mat-icon>
            </div>
            <div (click)="openContactModal(ngo.address, ngo.phone, ngo.email, ngo.website)">
              <mat-icon> contact_mail</mat-icon>
            </div>
          </div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NgoListPageComponent implements OnInit {
  snackbar = inject(MatSnackBar);
  messagesService = inject(MessagesApiService);

  service = inject(NGOsApiService);
  state = inject(NGOsStateService).$value;
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.service.getAll();
  }

  openMessageModal(id: string, name: string) {
    this.dialog
      .open(MessageDialogComponent, {
        width: '500px',
        data: {
          name,
          connector: 'odnośnie organizacji:',
        },
      })
      .afterClosed()
      .pipe(
        tap((value: MessageDialogFormValue) => {
          if (value) {
            this.snackbar.open('Wiadomość została wysłana!', '', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom',
            });
            this.messagesService.send({ ...value, receiverId: id, receiverType: 'ngo' });
          }
        }),
        take(1)
      )
      .subscribe();
  }

  openResourcesModal(items: string[]) {
    this.dialog.open(ListDialogComponent, {
      width: '450px',
      data: {
        items,
        title: 'Zasoby orgranizacji',
      },
    });
  }

  openCategoriessModal(items: { id: string; name: string }[]) {
    this.dialog.open(ListDialogComponent, {
      width: '450px',
      data: {
        items: items.map(item => item.name),
        title: 'Obszary działania',
      },
    });
  }

  openContactModal(address: string, phone: string, email: string, website: string) {
    this.dialog.open(NGOContactDialogComponent, {
      width: '450px',
      data: {
        address,
        phone,
        email,
        website,
      },
    });
  }
}
