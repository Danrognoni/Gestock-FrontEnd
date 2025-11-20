
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../model/producto';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  apiurl = 'http://localhost:3000/productos';

  productos: Producto[]


  constructor(private http: HttpClient) {
    this.productos = [];
  }



  getProductos(): Observable<Producto[]> {

    return this.http.get<Producto[]>(this.apiurl + '?_expand=proveedor&_expand=descuento');
  }

  postProductos(data: Omit<Producto, 'id'>): Observable<Producto> {
    return this.http.post<Producto>(this.apiurl, data);
  }

  getProductoById(id: string) {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<any>(url + '?_expand=proveedor&_expand=descuento');
  }

  deleteProducto(id: number) {
    const url = `${this.apiurl}/${id}`;
    return this.http.delete(url);
  }

  updateProducto(id: string, data: Producto): Observable<Producto> {
    const url = `${this.apiurl}/${id}`;
    return this.http.put<Producto>(url, data);
  }

  buscarProductos(termino: string): Observable<Producto[]> {
    return this.getProductos().pipe(
      map(productos => {
        const terminoLower = termino.toLowerCase();

        return productos.filter(p =>
          p.nombre.toLowerCase().includes(terminoLower) ||
          p.descripcion.toLowerCase().includes(terminoLower)
        );
      })
    );
  }

  getProductosPorCategoria(categoria: string): Observable<Producto[]> {
    const url = `${this.apiurl}?categoria=${categoria}&_expand=proveedor&_expand=descuento`;
    return this.http.get<Producto[]>(url);
  }

}
