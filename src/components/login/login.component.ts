import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  
  constructor(private authService: AuthService, private router: ActivatedRoute) {}
  error: boolean; // questo mi serve per l'invalid data nel form del login

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  dataLogin() {
    // chiamata al servizio di autenticazione
    this.loginForm.markAsPristine();
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.error= false;
        localStorage.setItem('token', res.token) // salva il token di autenticazione nel localstorage
        console.log('token', res.token) // stampa il token
        console.log('login', res) 

      },
      error: (err) => {
        this.error = true;
        console.log(err);
      }
    });
}
}


