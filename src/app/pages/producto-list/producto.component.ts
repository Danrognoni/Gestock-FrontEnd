import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Producto } from '../../model/producto';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
  standalone: true
})
export class ProductoComponent implements OnInit {

  Productos: any[] = [];
  Productos2: Producto[] = [];
  todosLosProductos: Producto[] = [];
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
        this.todosLosProductos = data;
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
          this.Productos = this.Productos.filter(p => p.id !== id);
        },
        error: () => {
          alert("Error fatal");
        }
      });
    }
  }
  buscarProducto(termino: string) {
    const terminoLower = termino.toLowerCase().trim();
    if (!terminoLower) {
      this.Productos = [...this.todosLosProductos];
      return;
    }
    this.Productos = this.todosLosProductos.filter(p =>
      p.nombre.toLowerCase().includes(terminoLower) ||
      p.descripcion.toLowerCase().includes(terminoLower)
    );
  }

  filtrarCategoria(categoria: string) {
    this.productoService.getProductosPorCategoria(categoria).subscribe({
      next: (data) => this.Productos = data,
      error: (e) => console.error(e)
    });
  }
}
