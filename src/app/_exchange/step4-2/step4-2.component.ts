import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserModel} from '../../_entity/user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-step4-2',
  templateUrl: './step4-2.component.html',
  styleUrls: ['./step4-2.component.sass']
})
export class Step42Component implements OnInit {

  @Output() goBack = new EventEmitter<any>();

  user: UserModel = new UserModel();
  controlsName: string = '';
  controlsBank: number = null;
  controlsCode: number = null;
  checkboxForm: boolean = false;
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
      name: new FormControl(this.controlsName, [
        Validators.required,
        Validators.maxLength(64),
      ]),
      bank: new FormControl(this.controlsBank, [
        Validators.required,
        Validators.maxLength(10),
      ]),
      bank_code: new FormControl(this.controlsCode, [
        Validators.required,
        Validators.maxLength(4),
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
        Validators.maxLength(64)
      ]),
      checkbox: new FormControl(this.checkboxForm, [
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

    // this.loading = true;

    // return this.userService.registration().subscribe( (data) => {
    //   console.log(data);
    //   console.log(data.status);
    //   this.loading = false;
    // },
    //   error => {
    //     console.log(error);
    //     console.log(error.status);
    //     this.loading = false;
    //     return of();
    // });
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
}
