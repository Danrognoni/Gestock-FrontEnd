import { Component, inject } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Proveedor } from '../../model/proveedor';

@Component({
  selector: 'app-proveedor',
  imports: [],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent {
  private proveedorService = inject(ProveedorService);
  public proveedores = toSignal(this.proveedorService.getProveedores(), {
    initialValue: []
  });
  public proveedorSeleccionado:Proveedor | null = null;

  verDetalle(proveedor: Proveedor){
    this.proveedorSeleccionado = proveedor;
  }
  cerrarDetalle(){
    this.proveedorSeleccionado = null;
  }
}
