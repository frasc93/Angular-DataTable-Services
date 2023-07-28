import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public router: Router, private authService: AuthService) { }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }
  navigateToCart() {
    this.router.navigate(['/cart']);
  }
  logout(){
    this.authService.logout();
  }

}
