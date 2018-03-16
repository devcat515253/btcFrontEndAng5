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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {DialogQuestionComponent} from './_dialog/dialog-question/dialog-question.component';
import {DialogRegistrationComponent} from './_dialog/dialog-registration/dialog-registration.component';
import {EffectBlurService} from './_services/effect-blur.service';
import { DialogAuthComponent } from './_dialog/dialog-auth/dialog-auth.component';
import {UserService} from './_services/user.service';
import { DialogSuccessComponent } from './_dialog/dialog-success/dialog-success.component';
import { UserActivateComponent } from './_user/user-activate/user-activate.component';
import {NewsService} from './_services/news.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {PaginationService} from './_services/pagination.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

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
    PrepaidCardComponent,
    DialogRegistrationComponent,
    DialogQuestionComponent,
    DialogAuthComponent,
    DialogSuccessComponent,
    UserActivateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [
    DialogRegistrationComponent,
    DialogAuthComponent,
    DialogSuccessComponent,
    HeaderComponent
  ],
  providers: [
    EffectBlurService,
    UserService,
    NewsService,
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
