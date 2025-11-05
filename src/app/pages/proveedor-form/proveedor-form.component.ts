import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-form.component.html',
  styleUrl: './proveedor-form.component.css'
})
export class ProveedorFormComponent {
  private formBuilder:FormBuilder = inject(FormBuilder);
  private proveedorService:ProveedorService = inject(ProveedorService);
  public proveedorForm:FormGroup;
  private routes = inject(Router);
  constructor(){
    this.proveedorForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      telefono: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      direccion: ["", Validators.required]
    })
  }

  onSubmit():void{
    this.proveedorForm.markAllAsTouched;
    if(this.proveedorForm.invalid)
    {
      return;
    }
    this.postProducts();
  }

  postProducts(){
    return this.proveedorService.postProveedor(this.proveedorForm.value).subscribe({
      next: (newProduct) => {
        this.routes.navigate(["/proveedor"]);
      },
      error: (e) => {
        console.log("error");
      }
    })
  }
}
