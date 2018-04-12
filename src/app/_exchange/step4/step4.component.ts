import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../_services/user.service';
import {UserModel} from '../../_entity/user-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../../_validators/validator';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.sass']
})
export class Step4Component implements OnInit {

  user: UserModel = new UserModel();
  controlsId: string = '';
  checkboxForm: boolean = false;
  step4Form: FormGroup;
  loading: boolean = false;



  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();


  constructor(private userService: UserService) {
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
    this.step4Form = new FormGroup({

      id: new FormControl(this.controlsId, [
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
      checkbox: new FormControl(this.checkboxForm, [
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
    console.log("Форма пошла на отправку");
    this.goNext.emit(this.step4Form);
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
