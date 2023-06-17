import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService, LoginFormValue } from './data_access/auth.service';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginFormComponent],
  template: `
    <div class="flex items-center justify-center w-screen h-screen">
      <app-login-form (login)="login($event)" />
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthPageComponent {
  authService = inject(AuthService);

  login(loginFormValue: LoginFormValue) {
    this.authService.login(loginFormValue);
  }
}
