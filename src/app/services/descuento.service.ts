import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Descuento } from '../model/descuento';

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
}
