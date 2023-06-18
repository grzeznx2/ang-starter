import { Injectable } from '@angular/core';
import { NGO } from '../model/ngo.model';
import { CallState } from 'src/app/core/call-state.enum';
import { StateService } from 'src/app/core/state.service';

export interface NGOsStateValue {
  list: NGO[];
  loadListCallState: CallState;
  loadByIdCallState: CallState;
  profile: NGO | null;
  details: NGO | null;
  loadProfileCallState: CallState;
  updateProfileCallState: CallState;
}

const initialState: NGOsStateValue = {
  list: [],
  details: null,
  loadByIdCallState: 'INITIAL',
  loadListCallState: 'INITIAL',
  loadProfileCallState: 'INITIAL',
  updateProfileCallState: 'INITIAL',
  profile: null,
};

@Injectable({
  providedIn: 'root',
})
export class NGOsStateService extends StateService<NGOsStateValue> {
  constructor() {
    super(initialState);
  }
}
