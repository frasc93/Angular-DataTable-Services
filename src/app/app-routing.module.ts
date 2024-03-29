import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from 'src/components/table/table.component';
import { DetailsComponent } from 'src/components/details/details.component';
import { LoginComponent } from 'src/components/login/login.component';
import { AuthGuard } from 'src/service/auth.guard';
import { CartComponent } from 'src/components/cart/cart.component';
import { CheckoutComponent } from 'src/components/checkout/checkout.component';
import { ConfirmationComponent } from 'src/components/confirmation/confirmation.component';


const routes: Routes = [
  { path: '', component: TableComponent, canActivate: [AuthGuard], title: 'Home'},
  { path: 'details/:id', component: DetailsComponent, canActivate: [AuthGuard], title: 'Details'},
  { path: 'login', component: LoginComponent,  title: 'Login'},
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard], title: 'Cart'},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], title: 'Checkout'},
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard], title: 'Confirmation'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
