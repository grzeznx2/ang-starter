import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { NGO } from '../model/ngo.model';
import { NGOsStateService } from './ngos.state.service';
import { tap } from 'rxjs';

export interface GetAllNGOsParams {}

export interface AddNGOFormValue {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: number; name: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class NGOsApiService extends HttpBaseService {
  private stateService = inject(NGOsStateService);

  constructor() {
    super('ngos');
  }

  add(payload: AddNGOFormValue) {
    return this.http.post<NGO>(`${this.url}`, payload);
  }

  getAll(params: GetAllNGOsParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    return this.http
      .get<NGO[]>(`${this.url}`)
      .pipe(
        tap(ngos => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: ngos });
        })
      )
      .subscribe();
  }
}
