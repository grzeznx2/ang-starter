import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOfferFormComponent } from './ui/add-offer-form.component';

@Component({
  selector: 'app-add-offer.page',
  standalone: true,
  imports: [CommonModule, AddOfferFormComponent],
  template: `
    <p>add-offer.page works!</p>
    <app-add-offer-form />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddOfferPageComponent {}
