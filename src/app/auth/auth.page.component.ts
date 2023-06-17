import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from './data_access/auth.service';
import { AuthStateService } from './data_access/auth.state.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  template: ` <button (click)="login()">LOGIN</button> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthPageComponent {
  authService = inject(AuthService);

  login() {
    this.authService.login();
  }
}
