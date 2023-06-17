import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/http-base.abstract.service';
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
    return this.http.get<Project[]>(`${this.url}`);
  }
}
