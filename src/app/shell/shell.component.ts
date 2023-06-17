import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HasRolePipe } from '../auth/utils/has-role.pipe';
import { UserRoles } from '../core/user-roles.enum';
import { AuthService } from '../auth/data_access/auth.service';

export interface MenuItem {
  link: string;
  displayValue: string;
  roles: UserRoles[];
}

@Component({
  selector: 'app-shell',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav
        #drawer
        class="sidenav"
        fixedInViewport
        [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false">
        <mat-toolbar>Menu</mat-toolbar>
        <mat-nav-list>
          <a *ngFor="let menuItem of menuItems | hasRole" mat-list-item [routerLink]="menuItem.link">{{
            menuItem.displayValue
          }}</a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <button
            type="button"
            aria-label="Toggle sidenav"
            mat-icon-button
            (click)="drawer.toggle()"
            *ngIf="isHandset$ | async">
            <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
          </button>
          <div class="flex justify-between w-full">
            <span>Kołobrzeg NGO</span>
            <button mat-button (click)="logout()">Wyloguj</button>
          </div>
        </mat-toolbar>
        <main class="p-4">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: 100%;
      }

      .sidenav {
        width: 200px;
      }

      .sidenav .mat-toolbar {
        background: inherit;
      }

      .mat-toolbar.mat-primary {
        position: sticky;
        top: 0;
        z-index: 1;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterOutlet,
    HasRolePipe,
    RouterModule,
  ],
})
export default class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
  menuItems: MenuItem[] = [
    { link: '/ngos', displayValue: 'Lista NGO', roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'] },
    { link: '/offers', displayValue: 'Lista ofert', roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'] },
    { link: '/companies', displayValue: 'Lista MŚP', roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'] },
    { link: '/projects', displayValue: 'Lista projektów', roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'] },

    { link: '/manage/offers', displayValue: 'Zarządzaj ofertami', roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER'] },
    {
      link: '/manage/projects',
      displayValue: 'Zarządzaj projektami',
      roles: ['NGO_USER', 'ADMIN', 'COMPANY_USER', 'CITIZEN'],
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );
}
