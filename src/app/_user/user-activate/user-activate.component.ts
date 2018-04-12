import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.sass']
})
export class UserActivateComponent implements OnInit {
  hashActivate: string = '';
  userActivateOkay: boolean = false;
  userActivateError: boolean = false;
  loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.readRouteHash();
  }

  readRouteHash() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.hashActivate = params['hash'];

      this.userService.activateUser(this.hashActivate).subscribe(
        (data) => {
          console.log(data);
          console.log('Пользователь активирован!');
          this.userActivateOkay = true;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.userActivateError = true;
          this.loading = false;
        }
      );
    });
  }








}
