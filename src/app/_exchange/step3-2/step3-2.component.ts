import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {of} from 'rxjs/observable/of';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {Exchange} from '../../_entity/exchange';
import {ExchangeService} from '../../_services/exchange.service';

@Component({
  selector: 'app-step3-2',
  templateUrl: './step3-2.component.html',
  styleUrls: ['./step3-2.component.sass']
})
export class Step32Component implements OnInit, OnDestroy {

  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;
  @Output() goBack = new EventEmitter<any>();
  @Output() exchangeSubmitResult = new EventEmitter<any>();
  loading: boolean = false;
  successRegistr: boolean = false;
  intervalId: any = 0;




  constructor(private cdr: ChangeDetectorRef,
              private userService: UserService,
              private exchangeService: ExchangeService) { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.checkActivateUserAuto();
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }


  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

  goToNext(event) {
    event.preventDefault();
   this.checkActivateUser();
  }


  checkActivateUserAuto() {
    this.userService.newUser$.flatMap(userResult => {
      return this.userService.auth(userResult);
    }).subscribe(
      (data) => {
        clearInterval(this.intervalId);
        console.log(data);

          this.exchangeService.getLimit(this.selectedFrom, this.inputFrom).subscribe( (result) => {
            // console.log(result);
            this.exchangeSubmitResult.emit(result);
            this.cdr.detectChanges();
          }, (error) => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
        return of();
      }
    );
  }

  checkActivateUser() {
    this.loading = true;
    this.userService.newUser$.flatMap(userResult => {
      return this.userService.auth(userResult);
    }).subscribe(
      (data) => {
        console.log(data);

        this.exchangeService.getLimit(this.selectedFrom, this.inputFrom).subscribe( (result) => {
          // console.log(result);

          clearInterval(this.intervalId);
          this.loading = false;
          this.successRegistr = true;
          setTimeout((() => this.successRegistr = false), 1000);
          this.exchangeSubmitResult.emit(result);
          this.cdr.detectChanges();
        }, (error) => {
          console.log(error);
        });
      },
      error => {
        console.log(error);
        return of();
      }
    );
  }



  // тут проверка на needVerif
  // еще одна проверка на BANK EUR || BANK CZK


}
