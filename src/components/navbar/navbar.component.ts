import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public router: Router) { }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }
  navigateToCart() {
    this.router.navigate(['/cart']);
  }

}
