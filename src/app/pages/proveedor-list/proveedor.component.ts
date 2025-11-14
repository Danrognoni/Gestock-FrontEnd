import { Component, inject, signal, Signal } from '@angular/core';
import { ProveedorService } from '../../services/proveedor.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Proveedor } from '../../model/proveedor';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proveedor',
  imports: [],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent {
  private proveedorService = inject(ProveedorService);
  private router = inject(Router);
  public proveedorSeleccionado:Proveedor | null = null;
  public proveedores = signal<Proveedor[]>([]);

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores.set(data); // <-- Actualiza la señal
      },
      error: (e) => {
        console.error("Error al cargar proveedores", e);
      }
    });
  }
  proveedorDetail(id: number){
    this.router.navigate(['proveedores/proveedorDetail/', id]);

  }

  deleteProveedor(id:number){
    if(confirm("Estás seguro de que deseas eliminar este proveedor?")){
      this.proveedorService.deleteProveedor(id).subscribe({
        next: () =>{
          alert("Proveedor eliminado con exito");
          this.proveedores.update(proveedoresActuales =>
            proveedoresActuales.filter(p => p.id !== id)
          );
        },
        error: ()=>{
          alert("Error fatal");
        }
      })
      this.proveedorService.getProveedores();
    }
  }
}
