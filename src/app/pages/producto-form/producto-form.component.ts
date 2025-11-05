import { Router, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-producto-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent {

  private fb = inject(FormBuilder);
  public productForm: FormGroup;
  public productService = inject(ProductoService);
  private routes = inject(Router);


  constructor(){
    this.productForm = this.fb.group({
      nombre : ['', Validators.required],
      descripcion : ['', Validators.required],
      categoria : ['', Validators.required],
      precio : ['', Validators.required],
      codigoBarras : [''],
      proveedorId : ['', Validators.required],
      descuentoId : ['', Validators.required]
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
    this.postProducts();
  }

  postProducts(){
    return this.productService.postProductos(this.productForm.value).subscribe({
      next : (newProduct) =>{
        this.routes.navigate(['/productos'])
      },
      error : (e) =>{
        console.error(e);
      }
    })
  }
}
