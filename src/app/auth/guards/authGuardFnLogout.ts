import { inject } from "@angular/core"
import { Router } from "@angular/router"

export const authGuardFnLogout = ()=>{
  const route = inject(Router);

  if(!localStorage.getItem('loggedUser')){
    return true;
  }else{
    route.navigateByUrl('home');
        return false;
  }
}
