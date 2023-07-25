import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    // verifica se l'utente è loggato
    if (this.authService.isLoggedIn()) {

     return true // permette l'accesso alla route
            
    } else {
      //window.alert('Access not allowed!');
      // reindirizza l'utente alla pagina di login
       return this.router.navigate(['/login']);
       
    }
  }

}

