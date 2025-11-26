import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  readonly apiUrl='http://localhost:3000/usuarios'
  empleados: Usuario[];

  constructor(private http: HttpClient) {
      this.empleados=[];
   }


getEmpleados(){
  return this.http.get<Usuario[]>(this.apiUrl);
}

postEmpleado(data: Omit<Usuario, 'id'>): Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrl, data);
}

  deleteEmpleado(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateEmpleado(id:string|null, data : Usuario): Observable<Usuario>{
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Usuario>(url, data);
    }
}
