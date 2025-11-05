import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Existencia } from '../model/existencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExistenciaService {
  readonly apiUrl='http://localhost:3000/existencias'
  existencias: Existencia[];

  constructor(private http: HttpClient) {
      this.existencias=[];
   }

  getExistencias(){
    return this.http.get<Existencia[]>(this.apiUrl);
  }

  postExistencias(data: Omit<Existencia, 'id'>): Observable<Existencia>{
    return this.http.post<Existencia>(this.apiUrl, data);
  }
}
