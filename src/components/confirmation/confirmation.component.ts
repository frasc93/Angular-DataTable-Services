import { Component } from '@angular/core';
import { Info } from 'src/modules/DataProducts';
import { Order } from 'src/modules/Order';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  cartItems: Info[] = [];
  orders: Order[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // recupera gli elementi del carrello per mostrarli nello storico degli acquisti
    this.cartItems = this.cartService.getCartItems();

    // recupera lo storico degli ordini completati
    this.orders = this.cartService.getOrders();
  }

}
