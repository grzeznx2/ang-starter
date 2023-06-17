import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsApiService } from './data-access/projects.api.service';
import { ProjectsStateService } from './data-access/projects.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';

@Component({
  selector: 'app-projects.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Projekty" [list]="state.list">
        <div #filters>filtry</div>
        <ng-template #item let-project>
          <div>{{ project.name }}</div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsListPageComponent implements OnInit {
  service = inject(ProjectsApiService);
  state = inject(ProjectsStateService).$value;

  ngOnInit(): void {
    this.service.getAll();
  }
}
