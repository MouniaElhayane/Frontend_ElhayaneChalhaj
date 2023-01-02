import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser:any
  constructor(private authService:AuthService){
    authService.$currentUSer.subscribe(res=>{
      this.currentUser= res
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route.routeConfig?.path);
      if(route.routeConfig?.path == 'add' 
      && ( this.currentUser.role == 'user' || this.currentUser.role =='admin' ) ) return true 

 if(route.routeConfig?.path == 'assignments/:id/edit' 
      && ( this.currentUser.role == 'user' || this.currentUser.role =='admin' ) ) return true 
     
      
    return false;
  }
  
}
