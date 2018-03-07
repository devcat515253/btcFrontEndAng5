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
import { LandingMagazineComponent } from './landing-magazine/landing-magazine.component';
import { NewsComponent } from './news/news.component';
import { PartnersComponent } from './partners/partners.component';
import { TableHistoryComponent } from './table-history/table-history.component';
import { TableHistoryReviewsComponent } from './table-history-reviews/table-history-reviews.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { SettingsComponent } from './settings/settings.component';
import { DiscountComponent } from './discount/discount.component';
import { PrepaidCardComponent } from './prepaid-card/prepaid-card.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    FaqComponent,
    ContactsComponent,
    FeesDiscountComponent,
    LandingMagazineComponent,
    NewsComponent,
    PartnersComponent,
    TableHistoryComponent,
    TableHistoryReviewsComponent,
    TestimonialsComponent,
    TransactionsComponent,
    SettingsComponent,
    DiscountComponent,
    SettingsComponent,
    PrepaidCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
