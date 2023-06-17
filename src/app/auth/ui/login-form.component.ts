import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserRoles } from 'src/app/core/user-roles.enum';
import { LoginFormValue } from '../data_access/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, CommonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="emitLogin()">
      <mat-form-field>
        <mat-label>Login</mat-label>
        <input formControlName="login" matInput />
      </mat-form-field>
      <br />
      <mat-form-field>
        <mat-label>Hasło</mat-label>
        <input formControlName="password" matInput />
      </mat-form-field>
      <br />

      <mat-form-field>
        <mat-label>Rola</mat-label>
        <mat-select formControlName="role" name="role">
          <mat-option *ngFor="let role of roles" [value]="role.id">
            {{ role.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <br />
      <div class="flex justify-center">
        <button mat-raised-button color="primary">Zaloguj</button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Output() login = new EventEmitter<LoginFormValue>();

  private builder = inject(NonNullableFormBuilder);

  roles: { id: UserRoles; name: string }[] = [
    {
      name: 'Admin',
      id: 'ADMIN',
    },
    {
      name: 'Obywatel',
      id: 'CITIZEN',
    },
    {
      name: 'Przedstawiciel MŚP',
      id: 'COMPANY_USER',
    },
    {
      name: 'Przedstawiciel NGO',
      id: 'NGO_USER',
    },
    {
      name: 'Menedżer',
      id: 'MANAGER',
    },
  ];

  form = this.builder.group({
    login: this.builder.control(''),
    password: this.builder.control(''),
    role: this.builder.control<UserRoles>('ADMIN'),
  });

  emitLogin() {
    this.login.emit(this.form.getRawValue());
  }
}
