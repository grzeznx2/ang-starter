import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsApiService } from './data-access/projects.api.service';
import { ProjectsStateService } from './data-access/projects.state.service';
import { ListShellComponent } from 'src/app/shared/ui/list-shell.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-projects.page',
  standalone: true,
  imports: [CommonModule, ListShellComponent, MatIconModule, MatTooltipModule],
  template: `
    <ng-container *ngIf="state() as state">
      <app-list-shell *ngIf="state.loadListCallState === 'LOADED'" listName="Projekty" [list]="state.list">
        <div #filters>filtry</div>
        <ng-template #item let-project>
          <div class="px-4 py-6">
            {{ project.name }}
            <img [src]="project.imageLink" />
            <mat-icon>paid</mat-icon> {{ project.budget }}
            <mat-icon *ngIf="project.possibleVolunteer">accessibility new</mat-icon>
            <mat-icon *ngIf="project.cooperationMessage" [matTooltip]="project.cooperationMessage"
              >spatial_audio_off</mat-icon
            >
            <mat-icon>forward_to_inbox</mat-icon>
          </div>
        </ng-template>
      </app-list-shell>
      <p *ngIf="state.loadListCallState === 'LOADING'">LOADING...</p>
    </ng-container>

    <!-- <img
      src="https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" /> -->
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
