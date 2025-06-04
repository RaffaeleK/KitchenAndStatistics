import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

export const AuthGuardS: CanActivateFn = (route, state) => {  
  const authService = inject(AuthService);
  const router = inject(Router);
  if(!authService.isLogged())
  {
      router.navigate(['login']);
      return false;
  }

  if(authService.getUniqueNameFromToken() == "kitchen"){
    router.navigate(['login']);
  }

  return true;
}