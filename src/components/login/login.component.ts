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

  
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}
  error: boolean; // questo mi serve per l'invalid data nel form del login

  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  dataLogin() {
    this.loginForm.markAsPristine(); //metodo che resetta il form dopo un'azione
    // chiamata al servizio di autenticazione
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.error= false;
        localStorage.setItem('token', res.token) // salva il token di autenticazione nel localstorage
        console.log('User Token:', res.token) 
        console.log('User Logged:', res) 
        this.router.navigate(['/']);

      },
      error: (err) => {
        this.error = true;
        console.log(err);
      }
    });
}
}


