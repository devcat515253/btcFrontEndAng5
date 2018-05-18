import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {UserModel} from '../../_entity/user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../../_validators/validator';
import {of} from 'rxjs/observable/of';
import {ExchangeStep4} from '../../_entity/steps-models';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.sass']
})
export class Step4Component implements OnInit {

  user: UserModel = new UserModel();
  formModel4: ExchangeStep4 = new ExchangeStep4;
  step4Form: FormGroup;
  loading: boolean = false;



  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();


  constructor(private userService: UserService,
              private cdr: ChangeDetectorRef) {
    this.initValidator();
  }

  ngOnInit() {
    this.getUser();
    this.checkLoadingProcess();
    this.autofillLastData();
  }

  checkLoadingProcess() {
    this.userService.loading$.subscribe( result => {
      this.loading = result;
    });
  }

  initValidator() {
    this.step4Form = new FormGroup({

      id: new FormControl(this.formModel4.controlsId, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(64)
      ]),
      checkbox: new FormControl(this.formModel4.checkboxForm, [
        Validators.required
      ])
    });
  }

  submit(event) {
    event.preventDefault();

    const controls = this.step4Form.controls;
    if (this.step4Form.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }
    this.formModel4.controlsEmail = this.user.email;
    localStorage.setItem('FS_Step4', JSON.stringify(this.formModel4));
    let dataForm = {
      formData: this.formModel4,
      formName: 'wallet'
    };
    this.goNext.emit(dataForm);
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

  fillLastData(event) {
    event.preventDefault();

    this.formModel4 = JSON.parse(localStorage.getItem('FS_Step4'));
    if  (this.formModel4 == null) { this.formModel4 = new ExchangeStep4; }
    // this.formModel4.controlsId = this.formModel4.controlsEmail;
    this.user.email = this.formModel4.controlsEmail;
    this.cdr.detectChanges();
  }

  autofillLastData() {
    this.formModel4 = JSON.parse(localStorage.getItem('FS_Step4'));
    if  (this.formModel4 == null) { this.formModel4 = new ExchangeStep4; }
    this.user.email = this.formModel4.controlsEmail;
    this.cdr.detectChanges();
  }
}
