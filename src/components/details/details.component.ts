import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Info } from 'src/modules/DataProducts';
import { CartService } from 'src/service/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit  {

  product: Info | undefined;
 
  isAdded: boolean = false;

  constructor (public dataService: DataService, private route: ActivatedRoute, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
      // ottiene l'id del prodotto dalla route
      const productId = this.route.snapshot.params['id'];

      if(productId)
      // recupera i dettagli del singolo prodotto per id dal service
      this.dataService.getSingleProduct(productId).subscribe((data: Info) => {
        this.product = data;
        this.product.quantity = 1;  // imposto la quantità iniziale a 1
      });
    
  }
  toggleAddToCart() {
    if (this.product) {
      // ottiene l'array dei prodotti nel carrello
      const cartItems = this.cartService.getCartItems();
      
  
      // verifica se il prodotto è già presente nel carrello
      const isProductInCart = cartItems.some(item => item.id === this.product?.id);
  
      if (!isProductInCart) {
        this.cartService.addToCart(this.product);
        this.isAdded = true;
      } else {
        this.isAdded = false; // il prodotto è già presente nel carrello, quindi non lo posso riaggiungere
      }
    } else {
      this.isAdded = false;
    }
  

  }

  //incrementa quantità del prodotto
  incrementQuantity() {
    if (this.product) {
      if (this.product.quantity === undefined) {
        this.product.quantity = 1;
      } else {
        this.product.quantity += 1;
      }
    }
  }
  //decremento quantità del prodotto
  decrementQuantity() {
    if (this.product) {
      if (this.product.quantity === undefined){
        this.product.quantity = 1;
      } else {
        this.product.quantity -= 1;
      }
    }
  }
  navigateToHomePage() {
    this.router.navigate(['/']);
  }

}
