import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
// import { Offer } from '../model/Offer.model';
import { CallState } from 'src/app/core/call-state.enum';
import { Offer } from '../model/offer.model';

export interface OffersStateValue {
  list: Offer[];
  loadListCallState: CallState;
}

@Injectable({
  providedIn: 'root',
})
export class OffersStateService {
  private $state = signal<OffersStateValue>({
    list: [],
    loadListCallState: 'INITIAL',
  });

  get $value() {
    return this.$state.asReadonly();
  }

  get value$() {
    return toObservable(this.$state);
  }

  setState(value: Partial<OffersStateValue>) {
    this.$state.update(state => ({ ...state, ...value }));
  }
}
