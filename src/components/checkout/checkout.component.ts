import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Info } from 'src/modules/DataProducts';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  
  cartItems: Info[] = [];
  totalCost: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalCost = this.cartService.getTotalCost();
  }

  //metodo per gestire l'acquisto
  purchase() {
    // aggiungo l'acquisto corrente allo storico degli acquisti
    this.cartService.addToPurchaseHistory();
    // dopo l'acquisto svuota il carrello
    this.cartService.clearCart();
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToConfirmation() {
    this.router.navigate(['/confirmation']);
  }

}
