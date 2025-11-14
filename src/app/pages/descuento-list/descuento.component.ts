
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
  deleteDescuento(id:number){
    if(confirm("Estás seguro de que desea eliminar este producto?")){
      this.descuentoService.deleteDescuento(id).subscribe({
        next: ()=> {
          alert("Producto eliminado con exito");
        },
        error:()=> {
          alert("Error fatal");
        }
      })
    }
  }

}
