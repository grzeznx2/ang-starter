import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  template: ` <p>auth.page works!</p> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthPageComponent {}
