import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestcompComponent } from '../shared/testcomp.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, TestcompComponent],
  template: `
    <app-testcomp />
    <router-outlet />
  `,
})
export default class ShellComponent {}
