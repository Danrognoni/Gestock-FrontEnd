import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone:true
})
export class NavbarComponent {

private router = inject(Router);


public authService = inject(AuthService);


  handleAuthAction() {
    if (this.authService.estoyLogeado()) {

      this.authService.logOut();
    } else {

      this.router.navigateByUrl('/login');
    }
  }
}
