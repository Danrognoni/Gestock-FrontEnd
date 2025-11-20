import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private readonly apiUrl = 'http://localhost:3000/proveedores';

  constructor(private httpClient: HttpClient) {}

  getProveedores(){
    return this.httpClient.get<Proveedor[]>(this.apiUrl);
  }

  postProveedor(data: Proveedor):Observable<Proveedor>{
    return this.httpClient.post<Proveedor>(this.apiUrl, data);
  }

  getProveedorById(id : string){
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Proveedor>(url);
  }

  updateProveedor(id:string, data:Proveedor):Observable<Proveedor>{
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<Proveedor>(url, data);
  }

  deleteProveedor(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete(url);
  }
}
