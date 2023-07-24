import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/modules/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient) {}

  login(login: User): Observable<User> {

    return this.http.post<User>(this.loginUrl, login);
  }

}

