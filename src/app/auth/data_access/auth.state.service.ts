import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { AuthStatus } from '../utils/auth-status.enum';

export interface AuthStateValue {
  status: AuthStatus;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private $state = signal<AuthStateValue>({
    status: 'AUTHENTICATED',
  });

  get $value() {
    return this.$state.asReadonly();
  }

  get value$() {
    return toObservable(this.$state);
  }

  setState(value: Partial<AuthStateValue>) {
    this.$state.update(state => ({ ...state, ...value }));
  }
}
