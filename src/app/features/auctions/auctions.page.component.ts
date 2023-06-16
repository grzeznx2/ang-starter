import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auctions-page',
  standalone: true,
  template: ` <p>auctions.page works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuctionsPageComponent {}
