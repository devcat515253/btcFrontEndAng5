import { Component, OnInit } from '@angular/core';
import {DialogRegistrationComponent} from '../../_dialog/dialog-registration/dialog-registration.component';
import {MatDialog} from '@angular/material';
import {EffectBlurService} from '../../_services/effect-blur.service';
import {DialogAuthComponent} from '../../_dialog/dialog-auth/dialog-auth.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog,
              private blurService: EffectBlurService,
              private translate: TranslateService) {
    translate.addLangs(['en', 'cz']);
    translate.setDefaultLang('en');
    translate.use('en');
  }



  ngOnInit() {
  }


  switchLanguage(lang: string){
    this.translate.use(lang);
  }





  openDialogReg(event): void {
    event.preventDefault();
    this.blurService.toggleBlur(true);


    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      width: '60rem',
      data: { name: this.name, animal: this.animal }
    });


    dialogRef.beforeClose().subscribe(result => {
      this.blurService.toggleBlur(false);
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      this.blurService.toggleBlur(false);
    });


  }

  openDialogAuth(event): void {
    event.preventDefault();
    this.blurService.toggleBlur(true);


    const dialogRef = this.dialog.open(DialogAuthComponent, {
      width: '60rem',
      data: { name: this.name, animal: this.animal }
    });


    dialogRef.beforeClose().subscribe(result => {
      this.blurService.toggleBlur(false);
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
      this.blurService.toggleBlur(false);
    });


  }

}
