import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NGO } from '../model/ngo.model';
import { CallState } from 'src/app/core/call-state.enum';

export interface NGOsStateValue {
  list: NGO[];
  loadListCallState: CallState;
}

@Injectable({
  providedIn: 'root',
})
export class NGOsStateService {
  private $state = signal<NGOsStateValue>({
    list: [],
    loadListCallState: 'INITIAL',
  });

  get $value() {
    return this.$state.asReadonly();
  }

  get value$() {
    return toObservable(this.$state);
  }

  setState(value: Partial<NGOsStateValue>) {
    this.$state.update(state => ({ ...state, ...value }));
  }
}
