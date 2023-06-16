import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';

@Injectable({
  providedIn: 'root',
})
export class OffersApiService extends HttpBaseService {}
