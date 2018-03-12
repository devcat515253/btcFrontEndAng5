import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserRegistr} from '../../_entity/user-registr';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.sass']
})
export class DialogRegistrationComponent implements OnInit {

  userRegistr: UserRegistr = new UserRegistr();

  policeAgree: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<DialogRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }



  submit(event) {
    event.preventDefault();

    console.log(this.userRegistr);
    console.log(this.policeAgree);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close({ data: 'data' });
  }

}


