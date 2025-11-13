import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExistenciaService } from '../../services/existencia.service';
import { Existencia } from '../../model/existencia';

@Component({
  selector: 'app-existencia-detail',
  imports: [],
  templateUrl: './existencia-detail.component.html',
  styleUrl: './existencia-detail.component.css'
})
export class ExistenciaDetailComponent {
  private router = inject(Router);
  public existenciaRepository = inject(ExistenciaService);
  public existencia = signal<Existencia|null>(null);
  private ruta = inject(ActivatedRoute);

  constructor(){}

  ngOnInit(): void {
      this.getExistenciaById();
  }

  getExistenciaById(){
    const id = this.ruta.snapshot.paramMap.get('id');
    if(id){
      this.existenciaRepository.getExistenciaById(+id).subscribe({
        next : (data)=>{
          this.existencia.set(data);
        },
        error : (e)=>{
          console.error(e);
        }
      })
    }
  }

  volver(){
    this.router.navigate(['/existencia/existenciaList']);
  }
}
