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

  update(id: string, payload: AddOfferFormValue) {
    return this.http.patch<Offer>(`${this.API_URL}/offers/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URL}/offers/${id}`);
  }

  getAll(params: GetAllOffersParams = {}) {
    return this.http.get<Offer[]>(`${this.API_URL}/offers`);
  }
}
