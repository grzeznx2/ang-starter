import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export interface AddOfferFormValue {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: number; name: string }[];
}

@Component({
  selector: 'app-add-offer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="add()">
      <mat-form-field>
        <mat-label>Nazwa</mat-label>
        <textarea formControlName="name" matInput></textarea>
        <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
        <mat-hint>Dodaj nazwę</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Opis</mat-label>
        <textarea formControlName="description" matInput></textarea>
        <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
        <mat-hint>Dodaj opis</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Data rozpoczęcia naboru</mat-label>
        <input matInput formControlName="startDate" [matDatepicker]="datepicker" />
        <mat-hint>DD/MM/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="datepicker"></mat-datepicker-toggle>
        <mat-datepicker #datepicker> </mat-datepicker>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Data zakończenia naboru</mat-label>
        <input matInput formControlName="startDate" [matDatepicker]="datepicker2" />
        <mat-hint>DD/MM/YYYY</mat-hint>
        <mat-datepicker-toggle matIconSuffix [for]="datepicker2"></mat-datepicker-toggle>
        <mat-datepicker #datepicker2> </mat-datepicker>
      </mat-form-field>
      <br />

      <mat-form-field>
        <mat-label>Link do BIP</mat-label>
        <input formControlName="link" matInput />
        <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
        <mat-hint>Dodaj</mat-hint>
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Kategorie</mat-label>
        <mat-select formControlName="categories" multiple>
          <mat-select-trigger>
            {{ form.controls.categories.value[0]?.name || '' }}
            <span *ngIf="(form.controls.categories.value.length || 0) > 1">
              (+{{ (form.controls.categories.value.length || 0) - 1 }}
              {{ form.controls.categories.value.length === 2 ? 'other' : 'others' }})
            </span>
          </mat-select-trigger>
          <mat-option *ngFor="let topping of categoryList" [value]="topping">{{ topping.name }}</mat-option>
        </mat-select>
      </mat-form-field>
      <br />
      <button mat-raised-button color="primary">dodaj</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOfferFormComponent {
  @Input() formValue?: AddOfferFormValue;

  private builder = inject(NonNullableFormBuilder);

  categoryList = [
    {
      name: 'kategoria1',
      id: 1,
    },
    {
      name: 'kategoria2',
      id: 2,
    },
  ];

  form = this.builder.group({
    name: this.builder.control(this.formValue?.name || ''),
    description: this.builder.control(this.formValue?.description || ''),
    startDate: this.builder.control(this.formValue?.startDate || ''),
    endDate: this.builder.control(this.formValue?.endDate || ''),
    link: this.builder.control(this.formValue?.link || ''),
    categories: this.builder.control<{ id: number; name: string }[]>(this.formValue?.categories || []),
  });

  add() {
    console.log(this.form.value);
  }
}
