import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../model/proveedor';

@Component({
  selector: 'app-proveedor-detail',
  imports: [],
  templateUrl: './proveedor-detail.component.html',
  styleUrl: './proveedor-detail.component.css'
})
export class ProveedorDetailComponent implements OnInit{
  private router = inject(Router);
  private routes = inject(ActivatedRoute);
  private proveedorService = inject(ProveedorService);
  public proveedor = signal<Proveedor | null>(null);

  constructor(){}

  ngOnInit(): void {
    this.getProveedorById();
  }

  getProveedorById(){
    const id = this.routes.snapshot.paramMap.get('id');
    if(id){
      this.proveedorService.getProveedorById(id).subscribe({
        next : (data)=>{
          this.proveedor.set(data);
        },
        error : (e)=>{
          console.error(e);
        }
      });
    }
  }

  volver(){
    this.router.navigate(['proveedores/proveedorList']);
  }
}
