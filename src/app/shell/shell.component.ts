import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>Kołobrzeg NGO</header>
    <router-outlet />
  `,
})
export default class ShellComponent {}
