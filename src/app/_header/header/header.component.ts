import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DialogRegistrationComponent} from '../../_dialog/dialog-registration/dialog-registration.component';
import {MatDialog} from '@angular/material';
import {EffectBlurService} from '../../_services/effect-blur.service';
import {DialogAuthComponent} from '../../_dialog/dialog-auth/dialog-auth.component';
import { TranslateService } from '@ngx-translate/core';
import {DialogSuccessComponent} from '../../_dialog/dialog-success/dialog-success.component';
import {UserService} from '../../_services/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  loggedUser: boolean = false;

  constructor(private cdr: ChangeDetectorRef,
              public dialog: MatDialog,
              private blurService: EffectBlurService,
              private translate: TranslateService,
              private userService: UserService) {
    translate.addLangs(['en', 'cz']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
    this.userService.token$.subscribe(logged => {
      this.loggedUser = logged;
      this.cdr.detectChanges();
    });
  }




  switchLanguage(lang: string){
    this.translate.use(lang);
  }

  btnLogout(event) {
    event.preventDefault();
    this.userService.logout();
    this.cdr.detectChanges();
  }



  openDialogReg(event): void {
    event.preventDefault();
    this.blurService.toggleBlur(true);


    const dialogRef = this.dialog.open(DialogRegistrationComponent, {
      width: '60rem',
    });


    dialogRef.beforeClose().subscribe(result => {
      this.blurService.toggleBlur(false);
    });

    dialogRef.afterClosed().subscribe(result => {
      this.blurService.toggleBlur(false);
    });


  }

  openDialogAuth(event): void {
    event.preventDefault();
    this.blurService.toggleBlur(true);


    const dialogRef = this.dialog.open(DialogAuthComponent, {
      width: '60rem',
    });


    dialogRef.beforeClose().subscribe(result => {
      this.blurService.toggleBlur(false);
    });

    dialogRef.afterClosed().subscribe(result => {
      this.blurService.toggleBlur(false);
    });
  }


  // openDSus() {
  //     this.blurService.toggleBlur(true);
  //
  //     const dialogRef = this.dialog.open(DialogSuccessComponent, {
  //       width: '60rem',
  //       data: { title: `${ this.translate.instant('popup-question.title') }` , subtitle: 'SUBTITLE SUCCESS MESSAGE' }
  //     });
  //
  //   //   console.log(this.translate.instant('popup-question.title'));
  //   // this.translate.get('popup-question.title').subscribe(res => {
  //   //   console.log(res);
  //   // });
  //
  //     dialogRef.beforeClose().subscribe(result => {
  //       this.blurService.toggleBlur(false);
  //     });
  // }

}
