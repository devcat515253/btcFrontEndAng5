import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogRegistrationComponent} from '../dialog-registration/dialog-registration.component';

@Component({
  selector: 'app-dialog-auth',
  templateUrl: './dialog-auth.component.html',
  styleUrls: ['./dialog-auth.component.sass']
})
export class DialogAuthComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    this.dialogRef.close({ data: 'data' });
  }

}
