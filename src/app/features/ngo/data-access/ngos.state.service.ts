import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NGO } from '../model/ngo.model';
import { CallState } from 'src/app/core/call-state.enum';
import { StateService } from 'src/app/core/state.service';

export interface NGOsStateValue {
  list: NGO[];
  loadListCallState: CallState;
}

const initialState: NGOsStateValue = {
  list: [],
  loadListCallState: 'INITIAL',
};

@Injectable({
  providedIn: 'root',
})
export class NGOsStateService extends StateService<NGOsStateValue> {
  constructor() {
    super(initialState);
  }
}
