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

  getProveedor(id:number){
    return this.httpClient.get<Proveedor>(`${this.apiUrl}/${id}`);
  }

  postProveedor(data: Omit<Proveedor, 'id'>):Observable<Proveedor>{
    return this.httpClient.post<Proveedor>(this.apiUrl, data);
  }

  getProveedorById(id : number){
    const url = `${this.apiUrl}/${id}`; 
    return this.httpClient.get<any>(url);
  }
}
