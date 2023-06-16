import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksListComponent } from '../shared/ui/books-list.component';
import { CarsListComponent } from '../shared/ui/cars-list.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, BooksListComponent, CarsListComponent],
  template: `
    <app-list-books />
    <app-list-cars />
    <header>Kołobrzeg NGO</header>
    <router-outlet />
  `,
})
export default class ShellComponent {}
