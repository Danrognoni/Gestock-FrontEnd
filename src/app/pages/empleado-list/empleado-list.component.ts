import { Component, inject } from '@angular/core';
import { EmpleadoService } from '../../services/empleado-service.service';
import { Router } from '@angular/router';
import { Usuario } from '../../model/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-empleado-list',
  imports: [],
  templateUrl: './empleado-list.component.html',
  styleUrl: './empleado-list.component.css'
})
export class EmpleadoListComponent {
  public empleadoService= inject(EmpleadoService);
  empleados: any[] = [];
  private route = inject(Router);
  empleadoSeleccionado: Usuario | null = null;
  public authService = inject(AuthService);
  public usuario: Usuario| null = null;

  constructor(){}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this.empleadoService.getEmpleados().subscribe({
      next: (data: Usuario[]) => {
        this.empleados = data.filter(user => user.rol === 'EMPLEADO');
      },
      error: (e) => {
        console.error("Error al cargar empleados:", e);
      }
    })
  }

  deleteEmpleado(id:string){
    if(confirm("Estás seguro de que desea eliminar este empleado?")){
      this.empleadoService.deleteEmpleado(id).subscribe({
        next: () => {
          alert("Empleado eliminado con exito");
          this.empleados = this.empleados.filter(e => e.id !== id);
        }
        ,
        error: () => {
          alert("Error fatal");
        }
      })
    }
  }
}
