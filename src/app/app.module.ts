import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StripeModule } from './stripe';
import { StripeElementsModule } from './stripe/elements';
import { StripeCardModule } from './stripe/elements/card';
import { StripeButtonModule } from './stripe/elements/button';
import { StripeMaterialModule } from './stripe/material';
import { AppComponent } from './app.component';

@NgModule({
  imports: [   
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    StripeModule.init('pk_test_ScThoGfGM6uXJgQPt0D3R1r400FyDt2uRD'),
    StripeElementsModule.init({
      fonts: [
        { cssSrc: 'https://fonts.googleapis.com/css?family=Ubuntu:400' }
      ]
    }),
    StripeCardModule,
    StripeButtonModule,
    StripeMaterialModule
  ],
  
  declarations: [ AppComponent ],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
