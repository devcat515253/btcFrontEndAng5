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

    this.userService.auth(this.userAuth).subscribe(
      (data) => {
        this.userService.getUserProfile().subscribe((result) => {
          this.userModel = result.data;
          this.userService.user$.next(this.userModel);

          this.exchangeService.getLimit(this.selectedFrom, this.inputFrom).subscribe((limitResult) => {
            this.userNotFound = false;
            this.loading = false;
            this.successAuth = true;
            // console.log(result);
            setTimeout((() => this.successAuth = false), 1000);
            setTimeout((() =>  this.exchangeSubmitResult.emit(limitResult)), 1000);
            this.cdr.detectChanges();
          }, (error) => {
            console.log(error);
            this.successAuth = false;
            this.loading = false;
          });

        }, (error) => {
          console.log(error);
          this.loading = false;
        });
      },
      error => {
        console.log(error);
        this.userNotFound = true;
        this.loading = false;
        this.successAuth = false;
      }
    );
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

  // ПРОВЕРКА НА needVerif

}
