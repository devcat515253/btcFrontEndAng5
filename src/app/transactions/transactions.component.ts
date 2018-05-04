import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserLogs} from '../_entity/user-logs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../_services/user.service';
import {Transaction} from '../_entity/transaction';
import {startTimeRange} from '@angular/core/src/profile/wtf_impl';
import {of} from 'rxjs/observable/of';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../_entity/user-model';

declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.sass']
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  routeHash: string;
  localHash: string;
  lastEmail: string;
  transaction: Transaction = new Transaction();

  loading: boolean = true;
  loadingReview: boolean = false;
  successAddReview: boolean = false;
  fieldReview: string;
  reviewForm: FormGroup;
  rating: number;
  isLogged: boolean = false;
  userModel: UserModel = new UserModel();

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
    this.reviewValidator();
    this.localHash = JSON.parse(localStorage.getItem('last_transaction')) || '';
    this.lastEmail = JSON.parse(localStorage.getItem('FS_Step4')) || '';
    this.rating = 0;
  }

  ngOnInit() {
    this.checkAuth();
    this.readLocalHash();
    this.readRouteHash();
    console.log(this.localHash);
  }

  ngAfterViewInit() {
    this.initJS();
  }


  checkAuth() {
    this.userService.token$.subscribe( (result) => {
      this.isLogged = result;
      setTimeout(() => {
        this.initJS();
      }, 100);
    });

    this.userService.user$.subscribe( (result) => {
      this.userModel = result;
      console.log(this.userModel);
    });
  }

  reviewValidator() {
    this.reviewForm = new FormGroup({
      review: new FormControl(this.fieldReview, [
        Validators.required,
        Validators.maxLength(640)
      ])
    });
  }

  setRating(count: number) {
    this.rating = count;
  }

  submitReviews(event) {
    event.preventDefault();
    const controls = this.reviewForm.controls;
    if (this.reviewForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loadingReview = true;

    this.userService.addReview(this.fieldReview, this.rating, this.transaction.id).subscribe((result) => {
      this.loadingReview = false;
      this.successAddReview = true;

      setTimeout(() => {
        $('#review-wrapper').fadeOut(400);
      }, 1500);
    }, (error) => {
      console.log(error);
  });
  }


  checkHash() {
    if (this.localHash === '' && this.routeHash === '') {
      this.router.navigate(['/home']);
    }
  }

  readLocalHash() {
    if (this.localHash === '') {
      return;
    }
    const subscription =  this.userService.getTransactionInfoFirst(this.localHash).flatMap(result => {
      this.transaction = result.data;
      setTimeout(() => {
        this.updateStatusBar();
      }, 100);
      return this.userService.getTransactionInfo(this.localHash);
    }).subscribe((result) => {
      this.transaction = result.data;
      console.log(this.transaction);
      setTimeout(() => {
        this.updateStatusBar();
      }, 100);

      if  (this.transaction.status === 3) { console.log('Success!'); subscription.unsubscribe(); }
    }, (error) => {
      console.log(error);
    });
  }

  readRouteHash() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.routeHash = params['hash'] || '';
      this.checkHash();

      console.log(this.routeHash);
    });
  }



  updateStatusBar() {
    $('.progress-bar > span').each(function () {
      let maxWidth = $(this).closest('span').attr('maxWidth');

      let _thisChildrenSpan = $(this).children('span');
      let statusText = _thisChildrenSpan.attr('statusText');

      if ($(this).closest('.progress-bar').hasClass('green')) {
        $(this)
          .css('width', maxWidth + '%');

        setTimeout(function () {
          _thisChildrenSpan.text(statusText);
        }, 1200);
      } else {
        _thisChildrenSpan.text(statusText);
      }
    });
  }



  initJS() {
    $('img.img-svg').each(function() {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's ID to the new SVG
        if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

    });
  }


}
