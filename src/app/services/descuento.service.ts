import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Descuento } from '../model/descuento';
import { map, Observable } from 'rxjs';
import { Existencia } from '../model/existencia';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {


  private apiURL = 'http://localhost:3000/descuentos';
  descuento : Descuento[];

  constructor(private http : HttpClient) {
    this.descuento = [];
  }

  getDescuentos(){
    return this.http.get<Descuento[]>(this.apiURL);
  }

  getDescuentoById(id : number){
    const url = `${this.apiURL}/${id}`;
    return this.http.get<any>(url);
  }

  deleteDescuento(id:number){
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url);
  }

  postDescuento(data : Omit<Descuento, 'id'>): Observable<Descuento>{
    return this.http.post<Descuento>(this.apiURL, data);
  }

  updateDescuento(id:string, data : Descuento): Observable<Descuento>{
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Descuento>(url, data);
  }

  getDescuentosPorVencer(dias : number): Observable<Descuento[]>{
    return this.getDescuentos().pipe(
      map(lista =>{
        const hoy = new Date();
        const fechaLimite = new Date();
        fechaLimite.setDate(hoy.getDate()+dias);
        return lista.filter(item=>{
          const fechaVencimiento = new Date(item.fechaFin);
          return fechaVencimiento>= hoy && fechaVencimiento<= fechaLimite;
        })

      })
    )
  }
}
