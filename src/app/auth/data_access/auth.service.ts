import { Injectable, inject } from '@angular/core';
import { AuthStatus } from '../utils/auth-status.enum';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { AuthStateService, User } from './auth.state.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthStateValue {
  status: AuthStatus;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService {
  router = inject(Router);
  authStateService = inject(AuthStateService);

  login() {
    // TODO: get role as argument
    const role = 'ADMIN';
    this.http.get<User[]>(`http://localhost:3000/users?role=${role}`).pipe(tap(this.setAuthenticatedUser)).subscribe();
  }

  private setAuthenticatedUser = (users: User[]) => {
    const [user] = users;
    if (!user) return;

    this.authStateService.setState({ status: 'AUTHENTICATED', user });
    this.router.navigateByUrl('/');
  };
}
