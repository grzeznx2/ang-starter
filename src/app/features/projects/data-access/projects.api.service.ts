import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
import { Injectable, inject } from '@angular/core';
import { ProjectsStateService } from './projects.state.service';
import { tap } from 'rxjs';
import { Project } from '../model/project.model';

export interface GetAllProjectsParams {}

export interface AddProjectFormValue {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
  categories: { id: number; name: string }[];
}

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

  update(id: string, payload: AddProjectFormValue) {
    return this.http.patch<Project>(`${this.url}/${id}`, payload);
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAll(params: GetAllProjectsParams = {}) {
    this.stateService.setState({ loadListCallState: 'LOADING' });

    this.http
      .get<Project[]>(`${this.url}`)
      .pipe(
        tap(Projects => {
          this.stateService.setState({ loadListCallState: 'LOADED', list: Projects });
        })
      )
      .subscribe();
  }
}
