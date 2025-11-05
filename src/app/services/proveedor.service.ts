import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedor } from '../model/proveedor';

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
}
