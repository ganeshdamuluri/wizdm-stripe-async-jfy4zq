import { Injectable, InjectionToken, Inject, Optional, NgZone } from '@angular/core';
import { StripeCaller } from './stripe-caller';

import type { 
  StripeConstructorOptions,
  StripeError,
  PaymentIntent,
  PaymentMethod,
  PaymentRequest,
  PaymentRequestOptions,
  SetupIntent,  
  Token,
  TokenCreateParams,
  Source,
  RedirectToCheckoutOptions,  
  ConfirmAlipayPaymentData,  
  ConfirmAlipayPaymentOptions,
  ConfirmAuBecsDebitPaymentData,
  ConfirmBancontactPaymentData,
  ConfirmBancontactPaymentOptions,
  ConfirmCardPaymentData,
  ConfirmCardPaymentOptions,
  ConfirmEpsPaymentData,
  ConfirmEpsPaymentOptions,
  ConfirmFpxPaymentData, 
  ConfirmFpxPaymentOptions,
  ConfirmGiropayPaymentData, 
  ConfirmGiropayPaymentOptions,
  ConfirmIdealPaymentData, 
  ConfirmIdealPaymentOptions,
  ConfirmP24PaymentData, 
  ConfirmP24PaymentOptions,
  ConfirmSepaDebitPaymentData,
  CreatePaymentMethodData,
  ConfirmAuBecsDebitSetupData,
  ConfirmBacsDebitSetupData,
  ConfirmCardSetupData, 
  ConfirmCardSetupOptions,
  ConfirmSepaDebitSetupData,
  StripeIbanElement,
  CreateTokenIbanData,
  StripeCardElement, 
  StripeCardNumberElement, 
  CreateTokenCardData,
  CreateTokenPiiData,
  CreateTokenBankAccountData,
  StripeCardCvcElement,
  StripeElement, 
  CreateSourceData,
  RetrieveSourceParam
} from '@stripe/stripe-js';

/** Stripe Public Key token */
export const STRIPE_PUBLIC_KEY = new InjectionToken<string>('wizdm.stripe.public.key');

/** Stripe Options token */
export const STRIPE_OPTIONS = new InjectionToken<StripeConstructorOptions>('wizdm.stripe.options');

/** Stripe.js Injectale proxy service for Angular */
@Injectable()
export class StripeService extends StripeCaller {
  
  /////////////////////////////
  /// Checkout
  ///
  /// https://stripe.com/docs/js/checkout
  /////////////////////////////

  /**
   * Use `stripe.redirectToCheckout` to redirect your customers to [Checkout](https://stripe.com/docs/payments/checkout), a Stripe-hosted page to securely collect payment information.
   * When the customer completes their purchase, they are redirected back to your website.
   */
  public redirectToCheckout(options: RedirectToCheckoutOptions): Promise<never | {error: StripeError}> {    
    return this.callStripe('redirectToCheckout', arguments);
  }

  /////////////////////////////
  /// Payment Intents
  ///
  /// https://stripe.com/docs/js/payment_intents
  /////////////////////////////

  /**
   * Use `stripe.confirmAlipayPayment` in the [Alipay Payments](https://stripe.com/docs/payments/alipay) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide, and it will automatically redirect the customer to authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_alipay_payment
   */
  public confirmAlipayPayment(clientSecret: string, data?: ConfirmAlipayPaymentData, options?: ConfirmAlipayPaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {    
    return this.callStripe('confirmAlipayPayment', arguments);
  }

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmAuBecsDebitPayment` in the [BECS Direct Debit Payments](https://stripe.com/docs/payments/payment-methods/au-becs-debit) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/payment-methods/au-becs-debit-quickstart-payment-intents) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_au_becs_debit_payment
   */
  public confirmAuBecsDebitPayment(clientSecret: string, data?: ConfirmAuBecsDebitPaymentData): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmAuBecsDebitPayment', arguments);
  }
  
  /**
   * Use `stripe.confirmBancontactPayment` in the [Bancontact Payments with Payment Methods](https://stripe.com/docs/payments/bancontact#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to the authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_bancontact_payment
   */
  public confirmBancontactPayment(clientSecret: string, data?: ConfirmBancontactPaymentData, options?: ConfirmBancontactPaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmBancontactPayment', arguments);
  }

  /**
   * Use `stripe.confirmCardPayment` when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide and carry out 3DS or other next actions if they are required.
   *
   * If you are using [Dynamic 3D Secure](https://stripe.com/docs/payments/3d-secure#three-ds-radar), `stripe.confirmCardPayment` will trigger your Radar rules to execute and may open a dialog for your customer to authenticate their payment.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_card_payment
   */
  public confirmCardPayment(clientSecret: string, data?: ConfirmCardPaymentData, options?: ConfirmCardPaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> { 
    return this.callStripe('confirmCardPayment', arguments);
  };

  /**
   * Use `stripe.confirmEpsPayment` in the [EPS Payments with Payment Methods](https://stripe.com/docs/payments/eps#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to the authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_eps_payment
   */
  public confirmEpsPayment(clientSecret: string, data?: ConfirmEpsPaymentData, options?: ConfirmEpsPaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmEpsPayment', arguments);
  }

  /**
   * Use `stripe.confirmFpxPayment` in the [FPX Payments with Payment Methods](https://stripe.com/docs/payments/fpx#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to the authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_fpx_payment
   */
  public confirmFpxPayment(clientSecret: string, data?: ConfirmFpxPaymentData, options?: ConfirmFpxPaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmFpxPayment', arguments);
  }

  /**
   * Use `stripe.confirmGiropayPayment` in the [giropay Payments with Payment Methods](https://stripe.com/docs/payments/giropay#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to the authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_giropay_payment
   */
  public confirmGiropayPayment(clientSecret: string, data?: ConfirmGiropayPaymentData, options?: ConfirmGiropayPaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmGiropayPayment', arguments);
  }

  /**
   * Use `stripe.confirmIdealPayment` in the [iDEAL Payments with Payment Methods](https://stripe.com/docs/payments/ideal) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to the authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_ideal_payment
   */
  public confirmIdealPayment(clientSecret: string, data?: ConfirmIdealPaymentData, options?: ConfirmIdealPaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmGiropayPayment', arguments);
  }

  /**
   * Use `stripe.confirmP24Payment` in the [Przelewy24 Payments with Payment Methods](https://stripe.com/docs/payments/p24#web) flow when the customer submits your payment form.
   * When called, it will confirm the `PaymentIntent` with `data` you provide, and it will automatically redirect the customer to the authorize the transaction.
   * Once authorization is complete, the customer will be redirected back to your specified `return_url`.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_p24_payment
   */
  public confirmP24Payment(clientSecret: string, data?: ConfirmP24PaymentData, options?: ConfirmP24PaymentOptions): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmP24Payment', arguments);
  }

  /**
   * Use `stripe.confirmSepaDebitPayment` in the [SEPA Direct Debit Payments](https://stripe.com/docs/payments/sepa-debit) with Payment Methods flow when the customer submits your payment form.
   * When called, it will confirm the [PaymentIntent](https://stripe.com/docs/api/payment_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/sepa-debit) for more details.
   *
   * When you confirm a `PaymentIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `PaymentIntent`, this method can automatically create and attach a new PaymentMethod for you.
   * If you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/payment_intents/confirm_sepa_debit_payment
   */
  public confirmSepaDebitPayment(clientSecret: string, data?: ConfirmSepaDebitPaymentData): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('confirmSepaDebitPayment', arguments);
  }

  /**
   * Use `stripe.handleCardAction` in the Payment Intents API [manual confirmation](https://stripe.com/docs/payments/payment-intents/web-manual) flow to handle a [PaymentIntent](https://stripe.com/docs/api/payment_intents) with the `requires_action` status.
   * It will throw an error if the `PaymentIntent` has a different status.
   *
   * Note that `stripe.handleCardAction` may take several seconds to complete.
   * During that time, you should disable your form from being resubmitted and show a waiting indicator like a spinner.
   * If you receive an error result, you should be sure to show that error to the customer, re-enable the form, and hide the waiting indicator.
   *
   * Additionally, `stripe.handleCardAction` may trigger a [3D Secure](https://stripe.com/docs/payments/3d-secure) authentication challenge.
   * The authentication challenge requires a context switch that can be hard to follow on a screen-reader.
   * Ensure that your form is accessible by ensuring that success or error messages are clearly read out.
   *
   * @docs https://stripe.com/docs/js/payment_intents/handle_card_action
   */
  public handleCardAction(clientSecret: string): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('handleCardAction', arguments);
  }

  /**
   * Use stripe.createPaymentMethod to convert payment information collected by elements into a [PaymentMethod](https://stripe.com/docs/api/payment_methods) object that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/payment_intents/create_payment_method
   */
  public createPaymentMethod(paymentMethodData: CreatePaymentMethodData): Promise<{paymentMethod?: PaymentMethod; error?: StripeError}> {
   return this.callStripe('createPaymentMethod', arguments); 
  }

  /**
   * Retrieve a [PaymentIntent](https://stripe.com/docs/api/payment_intents) using its [client secret](https://stripe.com/docs/api/payment_intents/object#payment_intent_object-client_secret).
   *
   * @docs https://stripe.com/docs/js/payment_intents/retrieve_payment_intent
   */
  public retrievePaymentIntent(clientSecret: string): Promise<{paymentIntent?: PaymentIntent; error?: StripeError}> {
    return this.callStripe('retrievePaymentIntent', arguments); 
  }

  /////////////////////////////
  /// Setup Intents
  ///
  /// https://stripe.com/docs/js/setup_intents
  /////////////////////////////

  /**
   * Requires beta access:
   * Contact [Stripe support](https://support.stripe.com/) for more information.
   *
   * Use `stripe.confirmAuBecsDebitSetup` in the [BECS Direct Debit with Setup Intents](https://stripe.com/docs/payments/payment-methods/au-becs-debit-quickstart-setup-intents) flow when the customer submits your payment form.
   * When called, it will confirm the `SetupIntent` with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/payment-methods/au-becs-debit-quickstart-setup-intents) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_au_becs_debit_setup
   */
  public confirmAuBecsDebitSetup(clientSecret: string, data?: ConfirmAuBecsDebitSetupData): Promise<{setupIntent?: SetupIntent; error?: StripeError}> {
    return this.callStripe('confirmAuBecsDebitSetup', arguments); 
  }

  /**
   * Use `stripe.confirmBacsDebitSetup` in the [Bacs Direct Debit Payments](https://stripe.com/docs/payments/payment-methods/bacs-debit) flow when the customer submits your payment form.
   * When called, it will confirm the [SetupIntent](https://stripe.com/docs/api/setup_intents) with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/payment-methods/bacs-debit) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   * These use cases are detailed in the sections that follow.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_bacs_debit_setup
   */
  public confirmBacsDebitSetup(clientSecret: string, data?: ConfirmBacsDebitSetupData): Promise<{setupIntent?: SetupIntent; error?: StripeError}> {
    return this.callStripe('confirmBacsDebitSetup', arguments); 
  }

  /**
   * Use `stripe.confirmCardSetup` in the [Setup Intents API flow](https://stripe.com/docs/payments/save-and-reuse) when the customer submits your payment form.
   * When called, it will confirm the [SetupIntent](https://stripe.com/docs/api/setup_intents) with `data` you provide and carry out 3DS or other next actions if they are required.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_card_setup
   */
  public confirmCardSetup(clientSecret: string, data?: ConfirmCardSetupData, options?: ConfirmCardSetupOptions): Promise<{setupIntent?: SetupIntent; error?: StripeError}> {
    return this.callStripe('confirmCardSetup', arguments); 
  }

  /**
   * Use `stripe.confirmSepaDebitSetup` in the [SEPA Direct Debit with Setup Intents](https://stripe.com/docs/payments/sepa-debit-setup-intents) flow when the customer submits your payment form.
   * When called, it will confirm the `SetupIntent` with `data` you provide.
   * Note that there are some additional requirements to this flow that are not covered in this reference.
   * Refer to our [integration guide](https://stripe.com/docs/payments/sepa-debit-setup-intents) for more details.
   *
   * When you confirm a `SetupIntent`, it needs to have an attached [PaymentMethod](https://stripe.com/docs/api/payment_methods).
   * In addition to confirming the `SetupIntent`, this method can automatically create and attach a new `PaymentMethod` for you.
   * It can also be called with an existing `PaymentMethod`, or if you have already attached a `PaymentMethod` you can call this method without needing to provide any additional data.
   *
   * @docs https://stripe.com/docs/js/setup_intents/confirm_sepa_debit_setup
   */
  public confirmSepaDebitSetup(clientSecret: string, data?: ConfirmSepaDebitSetupData): Promise<{setupIntent?: SetupIntent; error?: StripeError}> {
    return this.callStripe('confirmSepaDebitSetup', arguments); 
  }

  /**
   * Retrieve a [SetupIntent](https://stripe.com/docs/api/setup_intents) using its client secret.
   *
   * @docs https://stripe.com/docs/js/setup_intents/retrieve_setup_intent
   */
  public retrieveSetupIntent(clientSecret: string): Promise<{setupIntent?: SetupIntent; error?: StripeError}> {
    return this.callStripe('retrieveSetupIntent', arguments); 
  }

  /////////////////////////////
  /// Payment Request
  ///
  /// https://stripe.com/docs/js/payment_request
  /////////////////////////////

  /**
   * Use `stripe.paymentRequest` to create a `PaymentRequest` object.
   * Creating a `PaymentRequest` requires that you configure it with an `options` object.
   *
   * In Safari, `stripe.paymentRequest` uses Apple Pay, and in other browsers it uses the [Payment Request API standard](https://www.w3.org/TR/payment-request/).
   */
  public paymentRequest(options: PaymentRequestOptions): Promise<PaymentRequest> {
    return this.callStripe('paymentRequest', arguments); 
  }

  /////////////////////////////
  /// Token and Sources
  ///
  /// https://stripe.com/docs/js/tokens_sources
  /////////////////////////////

  /**
   * Use `stripe.createToken` to convert information collected by an `IbanElement` into a single-use [Token](https://stripe.com/docs/api#tokens) that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=ibanElement
   */
  public createToken(tokenType: StripeIbanElement, data: CreateTokenIbanData): Promise<{token?: Token; error?: StripeError}>;

  /**
   * Use `stripe.createToken` to convert information collected by card elements into a single-use [Token](https://stripe.com/docs/api#tokens) that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
   */
  public createToken(tokenType: StripeCardElement | StripeCardNumberElement, data?: CreateTokenCardData): Promise<{token?: Token; error?: StripeError}>;

  /**
   * Use `stripe.createToken` to convert personally identifiable information (PII) into a single-use [Token](https://stripe.com/docs/api#tokens) for account identity verification.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=pii
   */
  public createToken(tokenType: 'pii', data: CreateTokenPiiData): Promise<{token?: Token; error?: StripeError}>;

  /**
   * Use `stripe.createToken` to convert bank account information into a single-use token that you safely pass to your server to use in an API call.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=bank_account
   */
  public createToken(tokenType: 'bank_account', data: CreateTokenBankAccountData): Promise<{token?: Token; error?: StripeError}>;

  /**
   * Use `stripe.createToken` to tokenize the recollected CVC for a saved card.
   * First, include the `cvc_update_beta_1` flag when creating an instance of the Stripe object.
   * Next, render an `CardCvcElement` to collect the data.
   * Then pass the `CardCvcElement` to `stripe.createToken` to tokenize the collected data.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/create_token?type=bank_account
   */
  public createToken(tokenType: 'cvc_update', element?: StripeCardCvcElement): Promise<{token?: Token; error?: StripeError}>;

  /**
   * Use `stripe.createToken` to create a single-use token that wraps a user’s legal entity information.
   * Use this when creating or updating a Connect account.
   * See the [account tokens documentation](https://stripe.com/docs/connect/account-tokens) to learn more.
   */
  public createToken(tokenType: 'account', data: TokenCreateParams.Account): Promise<{token?: Token; error?: StripeError}>;

  /**
   * Use `stripe.createToken` to create a single-use token that represents the details for a person.
   * Use this when creating or updating persons associated with a Connect account.
   * See the [documentation](https://stripe.com/docs/connect/account-tokens) to learn more.
   */
  public createToken(tokenType: 'person', data: TokenCreateParams.Person): Promise<{token?: Token; error?: StripeError}>;

  // createToken function implementation
  public createToken() { return this.callStripe('createToken', arguments); }

  /**
   * Use `stripe.createSource` to convert payment information collected by elements into a `Source` object that you safely pass to your server to use in an API call.
   * See the [Sources documentation](https://stripe.com/docs/sources) for more information about sources.
   */
  public createSource(element: StripeElement, sourceData: CreateSourceData): Promise<{source?: Source; error?: StripeError}>;

  /**
   * Use `stripe.createSource` to convert raw payment information into a `Source` object that you safely pass to your server to use in an API call.
   * See the [Sources documentation](https://stripe.com/docs/sources) for more information about sources.
   */
  public createSource(sourceData: CreateSourceData): Promise<{source?: Source; error?: StripeError}>;

  // createSource function implementation
  public createSource() { return this.callStripe('createSource', arguments); }

  /**
   * Retrieve a [Source](https://stripe.com/docs/api#sources) using its unique ID and client secret.
   *
   * @docs https://stripe.com/docs/js/tokens_sources/retrieve_source
   */
  public retrieveSource(source: RetrieveSourceParam): Promise<{source?: Source; error?: StripeError}> {
    return this.callStripe('retrieveSource', arguments);
  }
  
  // Extends the StripeCaller base class enabling Stripe sdk proxy capabilities
  constructor(@Inject(STRIPE_PUBLIC_KEY) publicKey: string, 
              @Optional() @Inject(STRIPE_OPTIONS) options: StripeConstructorOptions,
              zone: NgZone) { 
    super(publicKey, options, zone); 
  }
}