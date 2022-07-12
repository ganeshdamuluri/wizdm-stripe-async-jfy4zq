import { StripeCardElement } from "./card-element.component";
import { StripeCardControl } from "./card-control.directive";
import { NgModule } from "@angular/core";

@NgModule({
  imports: [],
  declarations: [StripeCardElement, StripeCardControl],
  exports: [StripeCardElement, StripeCardControl]
})
export class StripeCardModule {}
