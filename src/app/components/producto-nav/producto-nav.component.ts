import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-producto-nav',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './producto-nav.component.html',
  styleUrl: './producto-nav.component.css'
})
export class ProductoNavComponent {

}
