import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FaqComponent} from './faq/faq.component';
import {ContactsComponent} from './contacts/contacts.component';
import {FeesDiscountComponent} from './fees-discount/fees-discount.component';
import {NewsComponent} from './news/news.component';
import {LandingMagazineComponent} from './landing-magazine/landing-magazine.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'faq', component: FaqComponent},
  { path: 'feesdiscount', component: FeesDiscountComponent},
  { path: 'landingmagazine', component: LandingMagazineComponent},
  // { path: 'account', component: UserAccountComponent,
  //   children: [
  //     { path: '', redirectTo: '/account/dashboard', pathMatch: 'full'},
  //     { path: 'dashboard' ,  component: DashboardComponent},
  //     { path: 'portfolio' ,  component: PortfolioComponent}
  //   ]
  // },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
