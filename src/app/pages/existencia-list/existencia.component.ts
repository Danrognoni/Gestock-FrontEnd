import { Component, inject, OnInit } from '@angular/core';
import { ExistenciaService } from '../../services/existencia.service';
import { Router } from '@angular/router';
import { Existencia } from '../../model/existencia';

@Component({
  selector: 'app-existencia',
  imports: [],
  templateUrl: './existencia.component.html',
  styleUrl: './existencia.component.css'
})
export class ExistenciaComponent implements OnInit{
  public existenciaService= inject(ExistenciaService);
  existencias: any[] = [];
  private route = inject(Router);
   existenciaSeleccionado: Existencia | null = null;

  constructor(){}

  ngOnInit(): void {
    this.getExistencias();
  }

  getExistencias(){
    return this.existenciaService.getExistencias().subscribe({
      next: (data) => {
        this.existencias=data;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  verDetalle(id : number){
    this.route.navigate(['/existencia/existenciaDetail', id]);
  }



  cerrarDetalle(){
    this.existenciaSeleccionado = null;
  }
}
