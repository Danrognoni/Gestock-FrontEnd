import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../model/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
   apiurl = 'http://localhost:3000/productos';

   productos : Producto[]


  constructor(private http: HttpClient) {
    this.productos= [];
  }

  getProductos(){
   return  this.http.get<Producto[]>(this.apiurl);
  }
}
