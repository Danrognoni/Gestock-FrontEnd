import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../model/producto';
import { ActivatedRoute, Router, RouterLink, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { DescuentoService } from '../../services/descuento.service';
import { Proveedor } from '../../model/proveedor';
import { Descuento } from '../../model/descuento';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  public productForm: FormGroup;
  public productService = inject(ProductoService);
  private routes = inject(Router);
  public proveedorService = inject(ProveedorService);
  public descuentoService = inject(DescuentoService);
  public proveedores  = signal<Proveedor[]>([]);
  public descuentos  = signal<Descuento[]>([]);
  private ruta = inject(ActivatedRoute);
  productoId : number|null = null
  isEditMode : boolean=false;



  constructor(){
    this.productForm = this.fb.group({
      nombre : ['', Validators.required],
      descripcion : ['', Validators.required],
      categoria : ['', Validators.required],
      precio : ['', [Validators.required, Validators.min(1)]],
      codigoBarras : [''],
      fotoUrl : ['']
    })
  }


  get nombre() {
    return this.productForm.get('nombre');
  }

   get descripcion() {
    return this.productForm.get('descripcion');
  }


   get categoria() {
    return this.productForm.get('categoria');
  }

   get precio() {
    return this.productForm.get('precio');
  }

  get proveedorId(){
    return this.productForm.get('proveedorId');
  }

   get descuentoId(){
    return this.productForm.get('descuentoId');
  }

  onSubmit():void{
    this.productForm.markAllAsTouched;
    if(this.productForm.invalid){
      return;
    }
    if(this.isEditMode && this.productoId){
      this.productService.updateProducto(this.productoId, this.productForm.value).subscribe({
        next : ()=>{
          alert('Producto actualizado correctamente');
          this.routes.navigate(['productos/productoList']);
        },
        error : (e)=>{
          console.error(e);

        }
      })
    }else{
      this.postProducts();
    }
  }

  ngOnInit(): void {
    this.getDescuentos();
    this.getProveedores();
     const id = this.ruta.snapshot.paramMap.get('id');
     if(id){
      this.productoId=+id;
      this.isEditMode=true;
      this.loadProductoData(this.productoId);
     }
  }

  loadProductoData(id:number){
    this.productService.getProductoById(+id).subscribe({
      next : (producto)=>{
        this.productForm.patchValue(producto);
      },
      error : (e)=>{
        console.error(e);

      }
    })
  }

    getDescuentos(){
   return this.descuentoService.getDescuentos().subscribe({
    next : (data) =>{
      this.descuentos.set(data);
    },
    error : (e) =>{
      console.error(e);
    }
   }
   )
  }


    getProveedores(){
   return this.proveedorService.getProveedores().subscribe({
    next : (data) =>{
      this.proveedores.set(data);
    },
    error : (e) =>{
      console.error(e);
    }
   }
   )
  }

  postProducts(){
    return this.productService.postProductos(this.productForm.value).subscribe({
      next : (newProduct) =>{
        this.routes.navigate(['/productos/productoList'])
      },
      error : (e) =>{
        console.error(e);
      }
    })
  }


}
