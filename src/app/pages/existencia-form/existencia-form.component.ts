import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExistenciaService } from '../../services/existencia.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-existencia-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './existencia-form.component.html',
  styleUrl: './existencia-form.component.css'
})
export class ExistenciaFormComponent {
  private fb = inject(FormBuilder);
  public existenciaService = inject(ExistenciaService);
  public existenciaForm: FormGroup;
  private routes = inject(Router);

  constructor(){
    this.existenciaForm=this.fb.group({
      cantidad: ['', Validators.required],
      fechaEntrada: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
      productoId: ['', Validators.required]
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

  onSubmit(): void {
    this.existenciaForm.markAllAsTouched;
    if(this.existenciaForm.invalid){
      return;
    }
    this.postExistencia();
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
