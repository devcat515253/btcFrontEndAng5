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
import {AuthGuard} from './_guards/auth.guard';
import { FileValueAccessorDirective } from './_directives/file-value-accessor.directive';
import { ReferralComponent } from './referral/referral.component';
import {ReferralService} from './referral/referral.service';
import {TablesService} from './_services/tables.service';
import { Step1Component } from './_exchange/step1/step1.component';
import { Step2Component } from './_exchange/step2/step2.component';
import { Step3Component } from './_exchange/step3/step3.component';
import { Step31Component } from './_exchange/step3-1/step3-1.component';
import { Step32Component } from './_exchange/step3-2/step3-2.component';
import { Step33Component } from './_exchange/step3-3/step3-3.component';
import { Step34Component } from './_exchange/step3-4/step3-4.component';
import { Step35Component } from './_exchange/step3-5/step3-5.component';
import { Step36Component } from './_exchange/step3-6/step3-6.component';
import { Step4Component } from './_exchange/step4/step4.component';
import { Step41Component } from './_exchange/step4-1/step4-1.component';
import { Step42Component } from './_exchange/step4-2/step4-2.component';
import { Step43Component } from './_exchange/step4-3/step4-3.component';
import { Step5Component } from './_exchange/step5/step5.component';
import { Step6Component } from './_exchange/step6/step6.component';
import { Step61Component } from './_exchange/step6-1/step6-1.component';
import { Step62Component } from './_exchange/step6-2/step6-2.component';
import {ExchangeService} from './_services/exchange.service';
import { NumberOnlyDirective } from './_directives/number-only.directive';

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
    FileValueAccessorDirective,
    ReferralComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step31Component,
    Step32Component,
    Step33Component,
    Step34Component,
    Step35Component,
    Step36Component,
    Step4Component,
    Step41Component,
    Step42Component,
    Step43Component,
    Step5Component,
    Step6Component,
    Step61Component,
    Step62Component,
    NumberOnlyDirective
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
    // FileInputAccessorModule,
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
    PaginationService,
    AuthGuard,
    ReferralService,
    TablesService,
    ExchangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
