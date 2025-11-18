import { Component, inject, OnInit, signal } from '@angular/core';
import { ExistenciaService } from '../../services/existencia.service';
import { Router, RouterLink } from '@angular/router';
import { Existencia } from '../../model/existencia';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-existencia',
  imports: [RouterLink],
  templateUrl: './existencia.component.html',
  styleUrl: './existencia.component.css'
})
export class ExistenciaComponent implements OnInit{
  public existenciaService= inject(ExistenciaService);
  existencias: any[] = [];
  private route = inject(Router);
  existenciaSeleccionado: Existencia | null = null;
  public productoService = inject(ProductoService);
  public productos = signal<Producto[]>([]);

  constructor(){}

  ngOnInit(): void {
    this.getExistencias();
    this.getProductos();
  }

  getExistencias(){
    return this.existenciaService.getExistencias().subscribe({
      next: (data) => {
        this.existencias=data;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  verDetalle(id : number){
    this.route.navigate(['/existencia/existenciaDetail', id]);
  }



  cerrarDetalle(){
    this.existenciaSeleccionado = null;
  }

   getProductos() {
  this.productoService.getProductos().subscribe({
    next: (data) => {
      console.log('Datos recibidos:', data);
      this.productos.set(data);
    },
    error: (e) => {
      console.error('ERROR al pedir productos:', e);
    }
  });
}
  deleteExistencia(id:number){
    if(confirm("Estás seguro de que desea eliminar esta existencia?")){
      this.existenciaService.deleteExistencia(id).subscribe({
        next: () => {
          alert("Existencia eliminada con exito");
          this.existencias = this.existencias.filter(e => e.id !== id);
        }
        ,
        error: () => {
          alert("Error fatal");
        }
      })
    }
  }

}
