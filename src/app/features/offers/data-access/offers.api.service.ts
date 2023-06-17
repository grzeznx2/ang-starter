import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Offer } from '../model/offer.model';

export interface GetAllOffersParams {}

export interface AddOfferFormValue {
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
export class OffersApiService extends HttpBaseService {
  add(payload: AddOfferFormValue) {
    return this.http.post<Offer>(`${this.API_URL}/offers`, payload);
  }

  getAll(params: GetAllOffersParams = {}) {
    return this.http.get<Offer[]>(`${this.API_URL}/offers`);

    // return of<Offer[]>([]).pipe(delay(500));
  }
}
