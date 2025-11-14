import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Producto } from '../../model/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
  standalone: true
})
export class ProductoComponent implements OnInit {

  Productos: any[] = [];

  productoService = inject(ProductoService);

  productoSeleccionado: Producto | null = null;
  private route = inject(Router);

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos() {

    this.productoService.getProductos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.Productos = data;
      },
      error: (e) => {
        console.error('ERROR al pedir productos:', e);
      }
    });
  }

  verDetalle(id: number) {
    this.route.navigate(['/productos/productoDetail', id]);
  }



  cerrarDetalle() {
    this.productoSeleccionado = null;
  }

  deleteProducto(id: number) {
    if (confirm("Estás seguro de que deseas eliminar este producto")) {


      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          alert("Producto eliminado con exito");
        },
        error: () => {
          alert("Error fatal");
        }
      });
    }
  }




}
