import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Info } from 'src/modules/DataProducts';
import { Order } from 'src/modules/Order';

@Injectable({
  providedIn: 'root'
})
export class CartService {



  // BehaviorSubject che conterrà l'array dei prodotti nel carrello
  private cartSubject: BehaviorSubject<Info[]> = new BehaviorSubject<Info[]>([]);

  // observable che i componenti utilizzeranno per ricevere gli aggiornamenti sul carrello
  public cart$ = this.cartSubject.asObservable();

  constructor() {
    // recupera i dati del carrello dal localStorage (se presenti) all'inizializzazione del servizio
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartSubject.next(JSON.parse(storedCart)); // imposta il valore iniziale del BehaviorSubject
    }
  }

  // metodo per aggiungere un prodotto al carrello
  addToCart(product: Info) {
    const currentCart = this.cartSubject.getValue(); // ottiene l'array corrente dei prodotti nel carrello
    const updatedCart = [...currentCart, product]; // aggiunge il nuovo prodotto all'array
    this.cartSubject.next(updatedCart); // invia il nuovo array con il prodotto aggiunto come nuovo valore del BehaviorSubject
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // salva l'array aggiornato nel localStorage per mantenerlo tra le sessioni
  }

  // metodo per rimuovere un prodotto dal carrello
  removeFromCart(product: Info) {
    const currentCart = this.cartSubject.getValue(); 
    const updatedCart = currentCart.filter(item => item.id !== product.id); 
    this.cartSubject.next(updatedCart); 
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  }

  // metodo per ottenere l'array dei prodotti nel carrello
  getCartItems(): Info[] {
    return this.cartSubject.getValue(); 
  }

  //metodo per calcolare il costo totale nel carrello
  getTotalCost(): number {
    const cartItems = this.cartSubject.getValue();
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  //metodo per svuotare il carrello una volta fatto l'acquisto
  clearCart(){
    this.cartSubject.next([]); // reimposta il carrello con un array vuoto
    localStorage.removeItem('cart') // rimuove il carrello dal localStorage

  }

  private ordersKey = 'orders'; //chiave che recupera gli ordini memorizzati nel local storage

  //metodo per aggiungere un nuovo ordine allo storico degli acquisti
  addToPurchaseHistory() {
    // recupera gli ordini precedenti dal Local Storage tramite la chiave
    const previousOrders: Order[] = JSON.parse(localStorage.getItem(this.ordersKey) || '[]'); //array vuoto se non ci sono ordini precedenti

    // crea un nuovo ordine
    const newOrder: Order = {
      id: previousOrders.length + 1, //incrementa l'id
      items: this.cartSubject.getValue(),
      totalCost: this.getTotalCost(),
      date: new Date()
    };

    // aggiungo il nuovo ordine alla lista degli ordini precedenti
    previousOrders.push(newOrder);

    // salvo la lista aggiornata nel Local Storage
    localStorage.setItem(this.ordersKey, JSON.stringify(previousOrders));
  }

  //metodo per ottenere gli ordini presenti nello storico
  getOrders(): Order[] {
    // recupera gli ordini precedenti dal Local Storage, se non ci sono array vuoto
    return JSON.parse(localStorage.getItem(this.ordersKey) || '[]');
  }
  
}
