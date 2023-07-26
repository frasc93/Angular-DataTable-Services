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
      // recupera i dettagli del prodotto dal servizio
      this.dataService.getSingleProduct(productId).subscribe((data: Info) => {
        this.product = data;
      });
    
  }
  toggleAddToCart() {
    if (this.product) {
      // Aggiungi il prodotto al carrello utilizzando il cartService
      this.cartService.addToCart(this.product);
      this.isAdded = true;
    }

  }
  navigateToHomePage() {
    this.router.navigate(['/']);
  }

}
