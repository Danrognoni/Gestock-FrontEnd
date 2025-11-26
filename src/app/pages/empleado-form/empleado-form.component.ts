import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpleadoService } from '../../services/empleado-service.service';
import { Usuario, UserRole } from '../../model/usuario';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-form.component.html',
  styleUrl: './empleado-form.component.css'
})
export class EmpleadoFormComponent {

  private fb = inject(FormBuilder);
  public empleadoForm: FormGroup;
  private router = inject(Router);
  private empleadoService = inject(EmpleadoService);
  private ruta = inject(ActivatedRoute);
  public roles: UserRole[] = ['ADMINISTRADOR', 'EMPLEADO'];

  constructor() {
    this.empleadoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['EMPLEADO']
    });
  }

  get nombre() {
    return this.empleadoForm.get('nombre');
  }

  get apellido() {
    return this.empleadoForm.get('apellido');
  }

  get username() {
    return this.empleadoForm.get('username');
  }

  get password() {
    return this.empleadoForm.get('password');
  }

  onSubmit(): void {
    this.empleadoForm.markAllAsTouched();

    if (this.empleadoForm.invalid) {
      return;
    }

    this.postEmpleado();
  }

  postEmpleado() {
    this.empleadoService.postEmpleado(this.empleadoForm.value).subscribe({
      next: (newEmpleado) => {
        alert('Empleado creado con éxito');
        this.router.navigate(['/empleados/empleadoList']);
      },
      error: (e) => {
        console.error(e);
        alert('Error al crear empleado');
      }
    });
  }
}
