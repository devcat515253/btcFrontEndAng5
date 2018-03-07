import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
