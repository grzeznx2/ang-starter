import { Injectable, inject } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { ProjectsStateService } from './projects.state.service';
import { tap } from 'rxjs';
import { Project } from '../model/project.model';

export interface GetAllProjectsParams {}

export interface AddProjectFormValue {}

@Injectable({
  providedIn: 'root',
})
export class ProjectsApiService extends HttpBaseService {
  private stateService = inject(ProjectsStateService);

  constructor() {
    super('projects');
  }

  add(payload: AddProjectFormValue) {
    return this.http.post<Project>(`${this.url}`, payload);
  }

  getAll(params: GetAllProjectsParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    return this.http
      .get<Project[]>(`${this.url}`)
      .pipe(
        tap(Projects => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: Projects });
        })
      )
      .subscribe();
  }
}
