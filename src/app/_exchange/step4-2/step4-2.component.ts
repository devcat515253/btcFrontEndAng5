import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from '../../_entity/user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {ExchangeStep4and2} from '../../_entity/steps-models';

@Component({
  selector: 'app-step4-2',
  templateUrl: './step4-2.component.html',
  styleUrls: ['./step4-2.component.sass']
})
export class Step42Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();
  @Output() formFlag = new EventEmitter<any>();

  user: UserModel = new UserModel();
  formModel: ExchangeStep4and2 = new ExchangeStep4and2();

  step4_2Form: FormGroup;
  loading: boolean = false;



  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef) {
    this.initValidator();
  }

  ngOnInit() {
    this.getUser();
    this.checkLoadingProcess();
  }

  checkLoadingProcess() {
    this.userService.loading$.subscribe( result => {
      this.loading = result;
    });
  }

  initValidator() {
    this.step4_2Form = new FormGroup({
      name: new FormControl(this.formModel.controlsName, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      bank: new FormControl(this.formModel.controlsBank, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      bank_code: new FormControl(this.formModel.controlsBankCode, [
        Validators.required,
        Validators.maxLength(4),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ]),
      checkbox: new FormControl(this.formModel.checkboxForm, [
        Validators.required
      ])
    });
  }

  submit(event) {
    event.preventDefault();

    const controls = this.step4_2Form.controls;
    if (this.step4_2Form.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log("Форма пошла на отправку");
    this.formModel.controlsEmail = this.user.email;
    localStorage.setItem('FS_Step4_2', JSON.stringify(this.formModel));

    this.goNext.emit(this.formModel);
    this.formFlag.emit('BankEur');
  }

  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

  getUser() {
    this.userService.user$.subscribe((result) => {
      this.user = result;
      this.cdr.detectChanges();
      console.log(this.user);
    });
  }

  fillLastData(event) {
    event.preventDefault();

    this.formModel = JSON.parse(localStorage.getItem('FS_Step4_2')) || '';
    this.user.email = this.formModel.controlsEmail;
    this.cdr.detectChanges();
    console.log(this.step4_2Form);
  }
}
