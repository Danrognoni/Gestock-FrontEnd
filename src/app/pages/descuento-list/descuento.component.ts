
import { Component, inject, OnInit } from '@angular/core';
import { DescuentoService } from '../../services/descuento.service';
import { Descuento } from '../../model/descuento';

@Component({
  selector: 'app-descuento',
  imports: [],
  templateUrl: './descuento.component.html',
  styleUrl: './descuento.component.css'
})
export class DescuentoComponent implements OnInit {

  public descuentoService = inject(DescuentoService);
  descuentos : any[] = [];



  constructor(){}

  ngOnInit(): void {
    this.getDescuentos();
  }

  getDescuentos(){
   return this.descuentoService.getDescuentos().subscribe({
    next : (data) =>{
      this.descuentos=(data);
    },
    error : (e) =>{
      console.error(e);
    }
   }
   )
  }



}
