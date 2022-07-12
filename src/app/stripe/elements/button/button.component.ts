import { Component, Optional, forwardRef, Input, ElementRef } from '@angular/core';
import { StripeElementsDirective } from '../elements.directive';
import { StripeElementDirective } from '../element.directive';
import { StripeService } from '../../stripe.service';

import type { 
  StripePaymentRequestButtonElementOptions,
  PaymentRequestOptions 
} from '@stripe/stripe-js';

@Component({
  selector: 'wm-stripe-button',
  template: '',
  providers: [
    { provide: StripeElementDirective, useExisting: forwardRef(() => StripeButton) }
  ]
})
export class StripeButton extends StripeElementDirective<'paymentRequestButton'> {

  private get paymentRequestButton(): StripePaymentRequestButtonElementOptions['style']['paymentRequestButton'] {
    return this.style.paymentRequestButton || (this.style.paymentRequestButton = {});
  }

  constructor(private stripe: StripeService, @Optional() elements: StripeElementsDirective, ref: ElementRef<HTMLElement>) {
    super('paymentRequestButton', elements, ref);

    //this.forward( elm => elm.on('click', value => this.valueChange.emit(value) ));
  }

  @Input() set buttonType(value: StripePaymentRequestButtonElementOptions['style']['paymentRequestButton']['type']) {
    this.paymentRequestButton.type = value;
  }

  @Input() set theme(value: StripePaymentRequestButtonElementOptions['style']['paymentRequestButton']['theme']) {
    this.paymentRequestButton.theme = value;
  }

  @Input() set height(value: string) {
    this.paymentRequestButton.height = value;
  }

  @Input() set paymentRequest(value: PaymentRequestOptions) {

    this.stripe.paymentRequest(value).then(request => {

      request.canMakePayment().then( allowed => {

        if(allowed) { 
          this.init({ paymentRequest: request }); 
        }
      });
    });
  }
}