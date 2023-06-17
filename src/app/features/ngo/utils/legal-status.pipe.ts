import { Pipe, PipeTransform, inject } from '@angular/core';
import { WithUserRoles } from 'src/app/core/user-roles.enum';
import { LegalStatusNGO, legalStatusMap } from '../model/ngo.model';

@Pipe({
  name: 'legalStatus',
  standalone: true,
})
export class LegalStatusPipe implements PipeTransform {
  transform(status: LegalStatusNGO) {
    return legalStatusMap[status];
  }
}
