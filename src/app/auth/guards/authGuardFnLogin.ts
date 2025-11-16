import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const authGuardFnLogin=()=>{
  const route = inject(Router);

  if(!localStorage.getItem('loggedUser')){
    return true;
  }else{
    route.navigateByUrl('Acces-denied');
    return false;
  }
}
