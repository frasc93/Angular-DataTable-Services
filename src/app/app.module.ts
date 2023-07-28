import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from 'src/components/table/table.component';

import {MatIconModule} from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from 'src/components/login/login.component';
import { DetailsComponent } from 'src/components/details/details.component';
import { AuthInterceptor } from 'src/service/auth.interceptor';
import { CartComponent } from 'src/components/cart/cart.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { CheckoutComponent } from 'src/components/checkout/checkout.component';
import { ConfirmationComponent } from 'src/components/confirmation/confirmation.component';



@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DetailsComponent,
    LoginComponent,
    CartComponent,
    NavbarComponent,
    CheckoutComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
 
    

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
