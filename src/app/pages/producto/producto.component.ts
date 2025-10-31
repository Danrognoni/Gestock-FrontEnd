import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
  standalone:true
})
export class ProductoComponent implements OnInit{

  Productos: any[] = [];

  productoService = inject(ProductoService);

  ngOnInit(): void {
   this.getProductos()
  }

  getProductos(){
    this.productoService.getProductos().subscribe({
      next : (data)  => {
        this.Productos= data;
      },
      error : (e)=>{
        console.log(e);
      }
    })
  }
}
