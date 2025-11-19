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
      direccion: ["", Validators.required],
      imagen : ['', Validators.required]
    })
  }

  get nombre() {
    return this.proveedorForm.get('nombre');
  }

   get telefono() {
    return this.proveedorForm.get('telefono');
  }


   get email() {
    return this.proveedorForm.get('email');
  }

   get direccion() {
    return this.proveedorForm.get('direccion');
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
        this.routes.navigate(["/proveedores/proveedorList"]);
      },
      error: (e) => {
        console.log("error");
      }
    })
  }
}
