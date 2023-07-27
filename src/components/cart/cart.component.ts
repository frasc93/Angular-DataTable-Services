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

//aggiunge prodotto al carrello
addToCart(product: Info) {
  this.cartService.addToCart(product);
}

//rimuove prodotto dal carrello
removeFromCart(product: Info) {
  this.cartService.removeFromCart(product);
  console.log('Product removed from cart', product);
}

//decremento quantità nel carrello
decrementQuantity(product: Info) {
  if (product.quantity && product.quantity > 1) {
    product.quantity -= 1;
  }
}

//incremento quantità nel carrello
incrementQuantity(product: Info) {
  if (product.quantity === undefined) {
    product.quantity = 1;
  } else {
    product.quantity += 1;
  }
}

}
