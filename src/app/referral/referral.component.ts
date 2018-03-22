import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ReferralService} from './referral.service';
import {MatDialog} from '@angular/material';
import {EffectBlurService} from '../_services/effect-blur.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.sass']
})
export class ReferralComponent implements OnInit {

  param: number;
  paramAction: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private referralService: ReferralService,
              private userService: UserService,
              public dialog: MatDialog,
              private blurService: EffectBlurService) {}

  ngOnInit() {
    this.readRouteHash();
  }


  readRouteHash() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.param = params['referral-id'];
      this.paramAction = params['action'];
      this.referralService.setReferralId(this.param);

      this.userService.token$.subscribe((logged) => {
        if  (!logged) {
          if  (this.paramAction === 'registration') {
            this.router.navigate(['/home', 'registration']);
            return;
          }
        }
        this.router.navigate(['/home']);
      });
    });

  }

}
