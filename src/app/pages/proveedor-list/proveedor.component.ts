import { Component, inject } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Proveedor } from '../../model/proveedor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedor',
  imports: [],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent {
  private proveedorService = inject(ProveedorService);
  private router = inject(Router);
  public proveedores = toSignal(this.proveedorService.getProveedores(), {
    initialValue: []
  });
  public proveedorSeleccionado:Proveedor | null = null;

  proveedorDetail(id: number){
    this.router.navigate(['proveedores/proveedorDetail/', id]);

  }

  deleteProveedor(id:number){
    if(confirm("Estás seguro de que deseas eliminar este proveedor?")){
      this.proveedorService.deleteProveedor(id).subscribe({
        next: () =>{
          alert("Proveedor eliminado con exito");
        },
        error: ()=>{
          alert("Error fatal");
        }
      })
    }
  }
}
