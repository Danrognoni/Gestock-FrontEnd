import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar/navbar.component';

// Servicios
import { ProductoService } from '../../services/producto.service';
import { ProveedorService } from '../../services/proveedor.service';
import { ExistenciaService } from '../../services/existencia.service';
import { DescuentoService } from '../../services/descuento.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  private productoService = inject(ProductoService);
  private proveedorService = inject(ProveedorService);
  private existenciaService = inject(ExistenciaService);
  private descuentoService = inject(DescuentoService);
  public authService = inject(AuthService);
  public totalProductos = signal<number>(0);
  public totalProveedores = signal<number>(0);
  public alertasStock = signal<number>(0);
  public alertasVencimiento = signal<number>(0);
  public descuentosActivos = signal<number>(0);

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  cargarDatosDashboard() {

    this.productoService.getProductos().subscribe({
      next: (data) => this.totalProductos.set(data.length),
      error: (e) => console.error(e)
    });


    this.proveedorService.getProveedores().subscribe({
      next: (data) => this.totalProveedores.set(data.length),
      error: (e) => console.error(e)
    });


    this.existenciaService.getExistencias().subscribe({
      next: (data) => {

        const bajoStock = data.filter(e => Number(e.cantidad) < 10).length;
        this.alertasStock.set(bajoStock);


        const hoy = new Date();
        const limite = new Date();
        limite.setDate(hoy.getDate() + 40);

        const porVencer = data.filter(e => {
          const fecha = new Date(e.fechaVencimiento);
          return fecha >= hoy && fecha <= limite;
        }).length;
        this.alertasVencimiento.set(porVencer);
      },
      error: (e) => console.error(e)
    });


    this.descuentoService.getDescuentos().subscribe({
      next: (data) => {

        this.descuentosActivos.set(data.length);
      }
    });
  }
}
