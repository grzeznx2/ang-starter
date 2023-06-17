import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Offer } from '../model/offer.model';
import { OffersStateService } from './offers.state.service';
import { tap } from 'rxjs';

export interface GetAllOffersParams {}

export interface AddOfferFormValue {
  name: string;
  description: string;
  budget: number;
  fundingLevel: number;
  targetAudience: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: number; name: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class OffersApiService extends HttpBaseService {
  private stateService = inject(OffersStateService);

  constructor() {
    super('offers');
  }

  add(payload: AddOfferFormValue) {
    return this.http.post<Offer>(`${this.url}`, payload);
  }

  update(id: string, payload: AddOfferFormValue) {
    return this.http.patch<Offer>(`${this.url}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAll(params: GetAllOffersParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    return this.http
      .get<Offer[]>(`${this.url}`)
      .pipe(
        tap(offers => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: offers });
        })
      )
      .subscribe();
  }
}
