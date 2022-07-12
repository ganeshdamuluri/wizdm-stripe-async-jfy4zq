import type { Stripe, StripeConstructorOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { NgZone } from '@angular/core';

/** StripeCaller class implements a proxy to call the Stripe.js SDK */
export class StripeCaller {

  /** The active Stripe instance observable */
  readonly stripe: Promise<Stripe>;

  constructor(publicKey: string, options: StripeConstructorOptions, zone: NgZone) { 

    // Loads the stripe instance
    this.stripe = zone.runOutsideAngular(() => loadStripe(publicKey, options));
  }

  /** Invokes the requested Stripe funciton */
  protected callStripe(signature: string, args): Promise<any> {

    // Resolves the active Stripe instance
    return this.stripe.then( stripe => {

      // Gets the requested funciton to call upon
      const fn = stripe[signature];

      // Verifies the request really belongs to a function 
      if(typeof fn !== 'function') { throw new Error(`
        The requested signature '${signature}' is not a Stripe.js function. 
      `);}

      // Calls the Stripe function finally
      return fn(...args);
    }); 
  }
}
