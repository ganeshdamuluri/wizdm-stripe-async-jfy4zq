import { Component, NgZone } from '@angular/core';
import { StripeService } from './stripe/stripe.service';
import type { 
  StripeCardElement, 
  StripeError,
  PaymentRequestOptions
} from '@stripe/stripe-js';

@Component({
  selector: 'body',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { 'class': 'mat-typography' }
})
export class AppComponent { 

  public account = 'acct_12QkqYGSOD4VcegJ';
  public locale = 'en';
  public card: StripeCardElement;
  public name: string = '';

  constructor(private stripe: StripeService) {

    /*stripe.paymentRequest({
      country: 'IT',
      currency: 'eur',
      total: {
        label: 'Whatever',
        amount: 999
      }
    }).then( req => console.log(req) );*/
  }

  public pay() {

    const clientSecret = '123_secret_456';
    /**  
     * Call on your server to create a payment intent getting back a clientSecret
     * @see https://stripe.com/docs/payments/accept-a-payment
     * 
     *   stripe.paymentIntents.create({
     *     amount: 1099,
     *     currency: 'eur',
     *   }).then( intent => intent.clientSecret );
     * 
     */ 

    this.stripe.confirmCardPayment( clientSecret, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: this.name
        }
      }
    }).catch( e => {
      console.error(e)
      this.card = null;
    });
  }
}