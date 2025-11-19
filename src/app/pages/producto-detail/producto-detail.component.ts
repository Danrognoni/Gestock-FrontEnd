import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';
import { DescuentoService } from '../../services/descuento.service';
import { ProveedorService } from '../../services/proveedor.service';
import { Descuento } from '../../model/descuento';
import { Proveedor } from '../../model/proveedor';

@Component({
  selector: 'app-producto-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css',
  standalone:true
})
export class ProductoDetailComponent implements OnInit{
  private router = inject(Router);
  public productoService = inject(ProductoService);
  public producto = signal<Producto|null>(null);
  private ruta = inject(ActivatedRoute);
  public descuentoService = inject(DescuentoService);
  public proveedorService = inject(ProveedorService);
  public descuentos = signal<Descuento[]>([]);
  public proveedores = signal<Proveedor[]>([]);
  constructor(){}

  ngOnInit(): void {
      this.getProductoById();
      this.cargarProveedores();
      this.getDescuentos();
  }

  getProductoById(){
    const id = this.ruta.snapshot.paramMap.get('id');
    if(id){
      this.productoService.getProductoById(id).subscribe({
        next : (data)=>{
          this.producto.set(data);
          console.log('Datos del producto:', data);
        console.log('¿Tiene proveedor?', data.proveedor);
        },
        error : (e)=>{
          console.error(e);
        }
      })
    }
  }

    getDescuentos(){
   return this.descuentoService.getDescuentos().subscribe({
    next : (data) =>{
      this.descuentos.set(data);
      console.log("descuento", data)
    },
    error : (e) =>{
      console.error(e);
    }
   }
   )
  }

  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores.set(data);
        console.log("proveedores", data)
      },
      error: (e) => {
        console.error("Error al cargar proveedores", e);
      }
    });
  }

  volver(){
    this.router.navigate(['/productos/productoList']);
  }
}
