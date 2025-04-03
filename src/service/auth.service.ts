import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/modules/UserLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // username: emilys - password: emilyspass 
  private loginUrl = 'https://dummyjson.com/auth/login';
  loggedIn: boolean = false; // controllo se sono loggato

  constructor(private http: HttpClient, private router: Router) {}


  //service per user authentication
  login(login: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if(this.loggedIn) {
      this.router.navigate(['/']);
    }
    
    return this.http.post<User>(this.loginUrl, login, {headers});
 
  }

  // ottiene e salva il token
  getToken() {
    return localStorage.getItem('token');
  }

  // verifica se user è loggato
  isLoggedIn(): boolean {
    const authToken = localStorage.getItem('token');
    return Boolean(authToken);

  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['/login']);

  }

}

