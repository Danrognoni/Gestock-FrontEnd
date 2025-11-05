import { Component, inject, OnInit } from '@angular/core';
import { ExistenciaService } from '../../services/existencia.service';

@Component({
  selector: 'app-existencia',
  imports: [],
  templateUrl: './existencia.component.html',
  styleUrl: './existencia.component.css'
})
export class ExistenciaComponent implements OnInit{
  public existenciaService= inject(ExistenciaService);
  existencias: any[] = [];

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
}
