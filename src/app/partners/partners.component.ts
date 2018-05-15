import {Component, OnInit} from '@angular/core';
import {UserService} from '../_services/user.service';
import {UserModel} from '../_entity/user-model';



@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.sass']
})
export class PartnersComponent implements OnInit {

  refArray: UserModel[] = [];
  loadingRefList: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getPartnersList();
  }



  getPartnersList() {
    this.userService.getPartnersList().subscribe(result => {
      this.refArray = result.data as UserModel[];
      console.log(this.refArray);
      this.loadingRefList = false;
    }, (error) => {
      this.loadingRefList = false;
    });
  }

}
