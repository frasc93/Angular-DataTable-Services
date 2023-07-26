import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Info } from 'src/modules/DataProducts';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: Info[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });

}

addToCart(product: Info) {
  this.cartService.addToCart(product);
}


removeFromCart(product: Info) {
  this.cartService.removeFromCart(product);
  console.log('Product removed from cart', product);
}

}
