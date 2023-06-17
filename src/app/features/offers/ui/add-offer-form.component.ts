import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AddOfferFormValue } from '../data-access/offers.api.service';

@Component({
  selector: 'app-add-offer-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="addOffer()" class="flex flex-col">
      <mat-form-field>
        <mat-label>Nazwa</mat-label>
        <input formControlName="name" matInput />
        <!-- <mat-icon matSuffix>sentiment_very_satisfied</mat-icon> -->
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
        <input matInput formControlName="endDate" [matDatepicker]="datepicker2" />
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
          <mat-option *ngFor="let category of categoryList" [value]="category">{{ category.name }}</mat-option>
        </mat-select>
      </mat-form-field>
      <br />
      <button mat-raised-button color="primary">Zapisz</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOfferFormComponent {
  @Input() formValue?: AddOfferFormValue;
  @Output() add = new EventEmitter<AddOfferFormValue>();

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

  form!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    startDate: FormControl<string>;
    endDate: FormControl<string>;
    link: FormControl<string>;
    categories: FormControl<{ id: number; name: string }[]>;
  }>;

  addOffer() {
    this.add.emit(this.form.getRawValue());
  }

  ngOnInit() {
    let preselectedCategories: { id: number; name: string }[] = [];

    if (this.formValue) {
      preselectedCategories = this.categoryList.filter(cat =>
        this.formValue?.categories.some(({ id }) => id === cat.id)
      );
    }

    this.form = this.builder.group({
      name: this.builder.control(this.formValue?.name || ''),
      description: this.builder.control(this.formValue?.description || ''),
      startDate: this.builder.control(this.formValue?.startDate || ''),
      endDate: this.builder.control(this.formValue?.endDate || ''),
      link: this.builder.control(this.formValue?.link || ''),
      categories: this.builder.control<{ id: number; name: string }[]>(preselectedCategories),
    });

    console.log(this.form.value);
  }
}
