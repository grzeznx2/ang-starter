import { Pipe, PipeTransform, inject } from '@angular/core';
import { AuthStateService } from '../data_access/auth.state.service';
import { MenuItem } from '../../shell/shell.component';

@Pipe({
  name: 'hasRole',
  standalone: true,
})
export class HasRolePipe implements PipeTransform {
  role = inject(AuthStateService).$value().user?.role;

  transform(menuItems: MenuItem[], ...args: unknown[]): MenuItem[] {
    if (!this.role) return [];

    return menuItems.filter(menuItem => menuItem.roles.includes(this.role!));
  }
}
