import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';
import { StripeControlDirective } from '../control.directive';
import { StripeElementDirective } from '../element.directive';

@Directive({
  selector: 'wm-stripe-card[ngModel], wm-stripe-card[formControl], wm-stripe-card[formControlName]',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StripeCardControl), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => StripeCardControl), multi: true  }
  ]
})
export class StripeCardControl extends StripeControlDirective<'card'> {
  constructor(readonly element: StripeElementDirective<'card'>) {
    super(element);
  }
}