import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FaqComponent} from './faq/faq.component';
import {ContactsComponent} from './contacts/contacts.component';
import {FeesDiscountComponent} from './fees-discount/fees-discount.component';
import {NewsComponent} from './news/news.component';
import {LandingMagazineComponent} from './landing-magazine/landing-magazine.component';
import {PartnersComponent} from './partners/partners.component';
import {TableHistoryComponent} from './table-history/table-history.component';
import {TableHistoryReviewsComponent} from './table-history-reviews/table-history-reviews.component';
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {SettingsComponent} from './settings/settings.component';
import {PrepaidCardComponent} from './prepaid-card/prepaid-card.component';
import {DiscountComponent} from './discount/discount.component';
import {UserActivateComponent} from './_user/user-activate/user-activate.component';
import {AuthGuard} from './_guards/auth.guard';
import {ReferralComponent} from './referral/referral.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/:param', component: HomeComponent },
  // { path: 'referral/:referral-id', component: ReferralComponent },
  // { path: 'referral/:referral-id/:action', component: ReferralComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'tablehistoryreviews', component: TableHistoryReviewsComponent},
  { path: 'testimonials', component: TableHistoryComponent},
  { path: 'more',
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'faq', component: FaqComponent},
      { path: 'news', component: NewsComponent },
      { path: 'prepaid-card', component: PrepaidCardComponent},
      { path: 'partners', component: PartnersComponent},
      { path: 'discount', component: DiscountComponent},
      { path: 'feesdiscount', component: FeesDiscountComponent},
      { path: 'landingmagazine', component: LandingMagazineComponent},
      { path: 'payment',
        children: [
          { path: '', component: TransactionsComponent},
          { path: ':hash' ,  component: TransactionsComponent},
        ]
      },
    ]
  },


  { path: 'user',
    children: [
      // { path: '', redirectTo: '/home', pathMatch: 'full'},
      { path: 'activation/:hash' ,  component: UserActivateComponent},
      { path: 'settings' ,  component: SettingsComponent, canActivate: [AuthGuard]}
    ]
  },


  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
