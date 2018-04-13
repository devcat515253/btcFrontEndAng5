import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from '../../_entity/user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {ExchangeStep4and1} from '../../_entity/steps-models';

@Component({
  selector: 'app-step4-1',
  templateUrl: './step4-1.component.html',
  styleUrls: ['./step4-1.component.sass']
})
export class Step41Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();

  user: UserModel = new UserModel();
  formModel: ExchangeStep4and1 = new ExchangeStep4and1();
  step4_1Form: FormGroup;
  loading: boolean = false;



  constructor(private cdr: ChangeDetectorRef,
              private userService: UserService) {
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
    this.step4_1Form = new FormGroup({

      name: new FormControl(this.formModel.name, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      address: new FormControl(this.formModel.address, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      country: new FormControl(this.formModel.country, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      iban: new FormControl(this.formModel.iban, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      bic_swift: new FormControl(this.formModel.bic_swift, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      bank_name: new FormControl(this.formModel.bank_name, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      bank_address: new FormControl(this.formModel.bank_address, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      bank_country: new FormControl(this.formModel.bank_country, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(64)
      ]),
      checkbox: new FormControl(this.formModel.checkbox, [
        Validators.required
      ])
    });
  }

  submit(event) {
    event.preventDefault();

    const controls = this.step4_1Form.controls;
    if (this.step4_1Form.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    console.log("Форма пошла на отправку");
    localStorage.setItem('FS_Step4_1', JSON.stringify(this.formModel));


    this.goNext.emit(this.formModel);
  }

  fillLastData(event) {
    event.preventDefault();

    this.formModel = JSON.parse(localStorage.getItem('FS_Step4_1')) || '';
    this.user.email = this.formModel.email;
    this.cdr.detectChanges();
    console.log(this.formModel);
  }



  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }


  getUser() {
    this.userService.user$.subscribe((result) => {
      this.user = result;
      console.log(this.user);
    });
  }

}
