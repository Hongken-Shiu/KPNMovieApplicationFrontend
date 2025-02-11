import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const data=localStorage.getItem("auth_token")
  if(data){
    return true;
  }
  const router=new Router
  router.navigateByUrl("/default-page")
  return false;
};
