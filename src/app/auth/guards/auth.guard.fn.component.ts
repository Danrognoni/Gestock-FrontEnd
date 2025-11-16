
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


export const AuthGuardFnComponent = ()=>{
    const authService = inject(AuthService);
    const route = inject(Router);


    if(authService.estoyLogeado()|| localStorage.getItem('loggedUser')){
      return true;
    }else{
      route.navigateByUrl('Acces-denied');
      return false;
    }

}


