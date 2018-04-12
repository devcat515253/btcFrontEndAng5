import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileValidator} from '../../_validators/validator';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {UserModel} from '../../_entity/user-model';

@Component({
  selector: 'app-step3-4',
  templateUrl: './step3-4.component.html',
  styleUrls: ['./step3-4.component.sass']
})
export class Step34Component implements OnInit {


  userModel: UserModel = new UserModel();
  loadingIdCard: boolean = true;
  successIdCard: boolean = false;
  IdCardFileName: string = 'No file chosen';
  IdCardFileSize: number = 0;
  idCardForm: FormGroup;

  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();

  private base64Image: string;

  constructor(private userService: UserService) {
    this.idCardFormValidator();
  }

  ngOnInit() {
    this.getUserProfile();
  }


  goToBack(event) {
    event.preventDefault();
    this.goBack.emit();
  }

  goToNext(event) {
    event.preventDefault();
    this.goNext.emit();
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe((data) => {
      this.userModel = data.data;
      console.log(this.userModel);

      this.loadingIdCard = false;

      this.IdCardFileName = this.userModel.verification_image;
    }, (error) => {
      console.log(error);
      this.loadingIdCard = false;
    });
  }

  idCardFormValidator() {
    this.idCardForm = new FormGroup({
      file: new FormControl('',    [
        FileValidator.validate
      ])
    });
  }

  submitIdCardForm(event) {
    event.preventDefault();

    const controls = this.idCardForm.controls;


    if (this.idCardForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loadingIdCard = true;
    this.userService.updateUserIdCardProfile(this.base64Image).subscribe((data) => {
      // console.log(data);

      this.loadingIdCard = false;
      this.successIdCard = true;
      setTimeout((() => this.successIdCard = false), 1000);
      setTimeout((() => this.goNext.emit()), 1250);
    }, (error) => {
      console.log(error);
      this.loadingIdCard = false;
    });
  }


  // ================================
  // READ IMAGE FILE FOR ID CARD FORM
  // ================================
  fileChangeIdCard($event) {
    this.loadingIdCard = true;
    let fileList: FileList = $event.target.files;

    if (fileList.length > 0) {
      this.IdCardFileName = fileList[0].name;
      this.IdCardFileSize = fileList[0].size;

      if (this.IdCardFileSize >= 10485760) {
        // if (this.IdCardFileSize >= 5242880) {
        this.idCardForm.controls['file'].setErrors({'maxsize': true});
      }

      if  (!this.isImage(fileList[0])) {
        this.idCardForm.controls['file'].setErrors({'badformat': true});
      }

    } else {
      this.IdCardFileName = 'No file chosen';
      this.base64Image = '';
      this.loadingIdCard = false;
      return;
    }
    this.readImageIdCard($event.target);
  }


  readImageIdCard(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
      // console.log(this.base64Image);
      this.loadingIdCard = false;
    };
    myReader.readAsDataURL(file);
  }

  isImage(file) {
    return file['type'].split('/')[0] === 'image'; // returns true or false
  }

}
