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
    return this.http.get<Offer[]>(`${this.url}`);

    // return of<Offer[]>([]).pipe(delay(500));
  }
}
