import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './_footer/footer/footer.component';
import { HeaderComponent } from './_header/header/header.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FeesDiscountComponent } from './fees-discount/fees-discount.component';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    FaqComponent,
    ContactsComponent,
    FeesDiscountComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
