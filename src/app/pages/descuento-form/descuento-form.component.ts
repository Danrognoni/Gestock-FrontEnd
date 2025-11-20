import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DescuentoService } from '../../services/descuento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Descuento } from '../../model/descuento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-descuento-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './descuento-form.component.html',
  styleUrl: './descuento-form.component.css'
})
export class DescuentoFormComponent {
  private fb = inject(FormBuilder);
  public descuentoForm: FormGroup;
  private routes = inject(Router);
  public descuentoService = inject(DescuentoService);
  public descuentos  = signal<Descuento[]>([]);
  private ruta = inject(ActivatedRoute);
  descuentoId : string|null = null;
  isEditMode : boolean=false;
  public fecha = new Date().getFullYear();

  constructor(){
    this.descuentoForm = this.fb.group({
      descripcion : ['', Validators.required],
      porcentaje : ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      fechaInicio : ['', [Validators.required, Validators.min(this.fecha)]],
      fechaFin : ['', [Validators.required, Validators.min(this.fecha)]],
    })
  }

  get descripcion() {
    return this.descuentoForm.get('descripcion');
  }

   get porcentaje() {
    return this.descuentoForm.get('porcentaje');
  }

  get fechaInicio() {
    return this.descuentoForm.get('fechaInicio');
  }

   get fechaFin() {
    return this.descuentoForm.get('fechaFin');
  }

  onSubmit():void{
    this.descuentoForm.markAllAsTouched;
    if(this.descuentoForm.invalid){
      return;
    }
    if(this.isEditMode && this.descuentoId){
      this.descuentoService.updateDescuento(this.descuentoId, this.descuentoForm.value).subscribe({
        next : ()=>{
          alert('Descuento actualizado correctamente');
          this.routes.navigate(['descuento/descuentoList']);
        },
        error : (e)=>{
          console.error(e);

        }
      })
    }else{
      this.postDescuento();
    }
  }

  ngOnInit(): void {
     const id = this.ruta.snapshot.paramMap.get('id');
     if(id){
      this.descuentoId=id;
      this.isEditMode=true;
      this.loadDescuentoData(this.descuentoId);
     }
  }

  postDescuento(){
    return this.descuentoService.postDescuento(this.descuentoForm.value).subscribe({
      next : (newDescuento) =>{
        this.routes.navigate(['/descuento/descuentoList'])
      },
      error : (e) =>{
        console.error(e);
      }
    })
  }

  loadDescuentoData(id:string){
    this.descuentoService.getDescuentoById(+id).subscribe({
      next : (descuento)=>{
        this.descuentoForm.patchValue(descuento);
      },
      error : (e)=>{
        console.error(e);

      }
    })
  }
}
