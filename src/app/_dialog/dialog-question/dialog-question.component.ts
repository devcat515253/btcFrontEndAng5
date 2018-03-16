import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrls: ['./dialog-question.component.sass']
})
export class DialogQuestionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogQuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }


}
