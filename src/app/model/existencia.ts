import { Producto } from "./producto";

export interface Existencia {
  id:string;
  cantidad:number;
  fechaEntrada:Date;
  fechaVencimiento:Date;
  productoId:number;
  producto?: Producto;
}
