import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-form.component.html',
  styleUrl: './proveedor-form.component.css'
})
export class ProveedorFormComponent implements OnInit{
  private formBuilder:FormBuilder = inject(FormBuilder);
  private proveedorService:ProveedorService = inject(ProveedorService);
  public proveedorForm:FormGroup;
  private routes = inject(Router);
  public isEditMode:boolean = false;
  public proveedorId:string | null = null;
  private ruta = inject(ActivatedRoute);
  constructor(){
    this.proveedorForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      telefono: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      direccion: ["", Validators.required],
      imagen : ['']
    })
  }
  ngOnInit(): void {
    const id = this.ruta.snapshot.paramMap.get("id");
    if(id){
      this.proveedorId = id;
      this.isEditMode = true;
      this.updateProveedor(this.proveedorId);
    }
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
    if(this.isEditMode && this.proveedorId){
      this.proveedorService.updateProveedor(this.proveedorId, this.proveedorForm.value).subscribe({
        next: () => {
          alert("Proveedor actualizado correctamente");
          this.routes.navigate(["/proveedores/proveedorList"]);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
    else{
          this.postProducts();
    }
  }

  updateProveedor(id:string){
    return this.proveedorService.getProveedorById(id).subscribe({
      next: (proveedor) => {
        this.proveedorForm.patchValue(proveedor);
      }
      , error: (error) => {
        console.log(error);
      }
    })
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
