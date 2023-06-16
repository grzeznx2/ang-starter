import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-offer-form',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>add-offer-form works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOfferFormComponent {}
