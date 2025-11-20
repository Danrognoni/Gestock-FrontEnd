import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Existencia } from '../model/existencia';
import { map, Observable } from 'rxjs';

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
  return this.http.get<Existencia[]>(this.apiUrl + '?_expand=producto');
}

  postExistencias(data: Omit<Existencia, 'id'>): Observable<Existencia>{
    return this.http.post<Existencia>(this.apiUrl, data);
  }

  getExistenciaById(id : number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  deleteExistencia(id:number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateExistencia(id:number|null, data : Existencia): Observable<Existencia>{
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Existencia>(url, data);
    }

    getExistenciasPorVencer(dias: number): Observable<Existencia[]> {
    return this.getExistencias().pipe(
      map(lista => {
        const hoy = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(hoy.getDate() + dias);
        return lista.filter(item => {
          const fechaVenc = new Date(item.fechaVencimiento);
          return fechaVenc >= hoy && fechaVenc <= fechaLimite;
        });
      })
    );
  }
}
