
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  const user = authService.currentUser();

  if (authService.estoyLogeado() && user?.rol === 'ADMINISTRADOR') {
    return true;
  }else{
     return router.createUrlTree(['/Acces-denied']);
  }


};
