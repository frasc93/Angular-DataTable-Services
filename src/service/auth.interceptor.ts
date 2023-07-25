import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from 'src/modules/UserLogin';

@Injectable()
//garantisce che le richieste http abbiano il token di autenticazione appropriato nell'intestazione Authorization 
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<User>, next: HttpHandler) {
    const authToken = this.authService.getToken(); // prendiamo il token di autenticazione dal service AuthService

    // se il token esiste, cloniamo la richiesta originale e aggiungiamo un'intestazione "Authorization" con il token come valore
    if (authToken) {
      req = req.clone({ //clona la rihiesta perchè nella richiesta originale non è possibile fare modifiche
        setHeaders: {
            Authorization: "Bearer " + authToken
        }      
      });
      console.log(req)
    }
    //restituisce la richiesta clonata a next.handle() per consentire al processo di richiesta di continuare
    return next.handle(req);
  }
}
