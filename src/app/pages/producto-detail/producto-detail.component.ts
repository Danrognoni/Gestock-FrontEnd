import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../model/producto';
import { CommonModule } from '@angular/common';

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

  constructor(){}

  ngOnInit(): void {
      this.getProductoById();
  }

  getProductoById(){
    const id = this.ruta.snapshot.paramMap.get('id');
    if(id){
      this.productoService.getProductoById(+id).subscribe({
        next : (data)=>{
          this.producto.set(data);
        },
        error : (e)=>{
          console.error(e);
        }
      })
    }
  }

  volver(){
    this.router.navigate(['/productos/productoList']);
  }
}
