import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmailModel} from '../../_entity/email-model';
import {UserAuth} from '../../_entity/user-auth';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {ExchangeService} from '../../_services/exchange.service';
import {Exchange} from '../../_entity/exchange';
import {UserModel} from '../../_entity/user-model';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.sass']
})
export class Step3Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();
  @Output() goForgot = new EventEmitter<any>();
  @Output() exchangeSubmitResult = new EventEmitter<any>();
  @Input() inputFrom: number;
  @Input() selectedFrom: Exchange;
  userAuth: UserAuth = new UserAuth();
  userForgot: EmailModel = new EmailModel();
  userAuthForm: FormGroup;
  userNotFound: boolean = false;
  loading: boolean = false;
  successAuth: boolean = false;
  userModel: UserModel = new UserModel();

  @Input() inputExchangeFrom: number;
  @Input() exchangeFrom: Exchange;



  constructor(private cdr: ChangeDetectorRef,
              private userService: UserService,
              private exchangeService: ExchangeService) {
  }

  ngOnInit() {
    this.initValidator();
  }

  initValidator() {
    this.userAuthForm = new FormGroup({
      email: new FormControl(this.userAuth.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ]),
      password: new FormControl(this.userAuth.password, [
        Validators.required,
        Validators.maxLength(64)
      ]),
    });
  }

  inputPassChanged() {
    this.userNotFound = false;
  }

  submit(event) {
    event.preventDefault();

    const controls = this.userAuthForm.controls;

    if (this.userAuthForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log(this.userAuth);

    this.loading = true;


    this.userService.auth(this.userAuth).flatMap((authResult) => {
      return this.userService.getUserProfile();
    }).flatMap((userResult) => {
      this.userModel = userResult.data;
      this.userService.user$.next(this.userModel);
      return this.exchangeService.getLimit(this.selectedFrom, this.inputFrom);
    }).subscribe((limitResult) => {
      this.userNotFound = false;
      this.loading = false;
      this.successAuth = true;
      setTimeout((() => this.successAuth = false), 1000);
      setTimeout((() => this.exchangeSubmitResult.emit(limitResult)), 1000);
      this.cdr.detectChanges();
    }, (error) => {
      console.log(error);
      this.userNotFound = true;
      this.successAuth = false;
      this.loading = false;
    });
  }

  goToBack(event) {
    event.preventDefault();
    this.exchangeService.getLimit(this.exchangeFrom, this.inputExchangeFrom).subscribe( (result) => {
      this.goBack.emit(result);
    }, (error) => {
      console.log(error);
      this.goBack.emit();
    });
  }

  goToForgotComp(event) {
    event.preventDefault();
    this.goForgot.emit();
  }


}
