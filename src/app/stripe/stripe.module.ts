
import { NgModule, ModuleWithProviders, Inject, Optional, NgZone } from '@angular/core';
import { STRIPE_PUBLIC_KEY, STRIPE_OPTIONS, StripeService } from './stripe.service';

import type { StripeConstructorOptions } from '@stripe/stripe-js';

@NgModule({
  providers: [ StripeService ]
})
export class StripeModule {

  constructor(@Optional() @Inject(STRIPE_PUBLIC_KEY) publicKey, zone: NgZone) {

    if(!publicKey) { throw new Error(`
      Stripe module has not been initialized.
      Make sure to call StripeModule.init('pk_xxxxxxxxx') in your root or feature module.
    `);}
  }

  static init(publicKey: string, options?: StripeConstructorOptions): ModuleWithProviders<StripeModule> {
    return {
      ngModule: StripeModule,
      providers: [
        
        /** Provides the global Stripe public key */
        { provide: STRIPE_PUBLIC_KEY, useValue: publicKey },

        /** Provides the global stripe options */
        { provide: STRIPE_OPTIONS, useValue: options }
      ]
    };
  } 
}