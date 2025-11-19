import { Existencia } from './../../model/existencia';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExistenciaService } from '../../services/existencia.service';
import { routes } from '../../app.routes';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-existencia-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './existencia-form.component.html',
  styleUrl: './existencia-form.component.css'
})
export class ExistenciaFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  public existenciaService = inject(ExistenciaService);
  public existenciaForm: FormGroup;
  private routes = inject(Router);
  private ruta = inject(ActivatedRoute);
  existenciaId :number|null=null;
  isEditMode : boolean = false;
  public productoService = inject ( ProductoService);
  public productos = signal<Producto[]>([]);
  readonly anio = new Date().getFullYear();

  constructor(){
    this.existenciaForm=this.fb.group({
      cantidad: ['', Validators.required],
      fechaEntrada: ['', [Validators.required, Validators.max(this.anio)]],
      fechaVencimiento: ['', Validators.required],
    })
  }

  get cantidad(){
    return this.existenciaForm.get('cantidad');
  }
  get fechaEntrada(){
    return this.existenciaForm.get('fechaEntrada');
  }
  get fechaVencimiento(){
    return this.existenciaForm.get('fechaVencimiento');
  }
  get productoId(){
    return this.existenciaForm.get('productoId');
  }

  ngOnInit(): void {
     this.getProductos();
     const id = this.ruta.snapshot.paramMap.get('id');
     if(id){
      this.existenciaId=+id;
      this.isEditMode=true;
      this.loadExistenciaData(this.existenciaId);
     }
  }

  loadExistenciaData(id : number){
    this.existenciaService.getExistenciaById(+id).subscribe({
      next : (existencia)=>{
        this.existenciaForm.patchValue(existencia);
      },
      error : (e)=>{
        console.error(e);
      }
    })
  }

    getProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.productos.set(data);
      },
      error: (e) => {
        console.error('ERROR al pedir productos:', e);
      }
    });
  }

  onSubmit(): void {
    this.existenciaForm.markAllAsTouched;
    if(this.existenciaForm.invalid){
      return;
    }

    if(this.isEditMode && this.productoId){
      this.existenciaService.updateExistencia(this.existenciaId, this.existenciaForm.value).subscribe({
        next : ()=>{
          alert('Existencia actualizada correctamente');
          this.routes.navigate(['existencia/existenciaList']);
        },
        error : (e)=>{
          console.error(e);

        }
      })
    }else{
      this.postExistencia();
    }

  }

  postExistencia(){
    return this.existenciaService.postExistencias(this.existenciaForm.value).subscribe({
      next: (newExistencia) => {
        this.routes.navigate(['existencia']);
      },
      error: (e) => {
        console.error(e);
      }
    })
  }
}
