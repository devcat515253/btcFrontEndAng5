import { Component, OnInit } from '@angular/core';
import {DialogRegistrationComponent} from '../../_dialog/dialog-registration/dialog-registration.component';
import {MatDialog} from '@angular/material';
import {EffectBlurService} from '../../_services/effect-blur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog, private blurService: EffectBlurService) {}

  ngOnInit() {
  }


  openDialog(event): void {
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
      console.log('The dialog was closed');
      this.animal = result;
    });


  }

}
