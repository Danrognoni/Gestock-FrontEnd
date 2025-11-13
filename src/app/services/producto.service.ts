import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../model/producto';
import { Observable } from 'rxjs';


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

  postProductos(data : Omit<Producto, 'id'>): Observable<Producto>{
      return this.http.post<Producto>(this.apiurl, data);
  }

  getProductoById(id : number){
    const url = `${this.apiurl}/${id}`; 
    return this.http.get<any>(url);
  }

}
