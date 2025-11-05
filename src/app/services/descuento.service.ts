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
}
