import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Info } from 'src/modules/DataProducts';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject: BehaviorSubject<Info[]> = new BehaviorSubject<Info[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    // Recupera i dati del carrello dal localStorage (se presenti)
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart));
    }
  }

  addToCart(product: Info) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = [...currentCart, product];
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Salva nel localStorage
  }

  removeFromCart(product: Info) {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(item => item.id !== product.id);
    this.cartSubject.next(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Salva nel localStorage
  }

  getCartItems(): Info[] {
    return this.cartSubject.getValue();
  }
}
