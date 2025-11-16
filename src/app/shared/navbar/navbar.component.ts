import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logInLogOut() {

    if (!this.authService.estoyLogeado()) {
      this.router.navigateByUrl('login');
    }

    else{
      this.authService.logOut();
      this.router.navigateByUrl('home');
    }
  }
}
