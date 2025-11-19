import { Descuento } from "./descuento";
import { Proveedor } from "./proveedor";

export interface Producto {
  id:string;
  nombre:string;
  descripcion:string;
  categoria:string;
  precio:number;
  codigoBarras:string;
  proveedorId:number;
  descuentoId:number;
  fotoUrl : string;
  descuento?: Descuento;
  proveedor? : Proveedor;
}
