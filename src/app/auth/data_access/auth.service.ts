import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { AuthStateService, User } from './auth.state.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserRoles } from 'src/app/core/user-roles.enum';

export interface LoginFormValue {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  router = inject(Router);
  authStateService = inject(AuthStateService);

  login(loginFormValue: LoginFormValue) {
    this.http
      .get<User[]>(`http://localhost:3000/users?role=${loginFormValue.login}`)
      .pipe(tap(this.setAuthenticatedUser))
      .subscribe();
  }

  logout() {
    this.authStateService.setState({ status: 'NON_AUTHENTICATED', user: null });
    this.router.navigateByUrl('/');
  }

  private setAuthenticatedUser = (users: User[]) => {
    const [user] = users;
    if (!user) return;

    this.authStateService.setState({ status: 'AUTHENTICATED', user });
    this.router.navigateByUrl('/');
  };
}
