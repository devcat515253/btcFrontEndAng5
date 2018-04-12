import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileValidator} from '../../_validators/validator';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {UserModel} from '../../_entity/user-model';

@Component({
  selector: 'app-step3-5',
  templateUrl: './step3-5.component.html',
  styleUrls: ['./step3-5.component.sass']
})
export class Step35Component implements OnInit {

  userModel: UserModel = new UserModel();
  KycForm: FormGroup;
  private base64Image: string;
  loadingKyc: boolean = true;
  successKycTip: boolean = false;
  KycFileName: string = 'No file chosen';
  KycFileSize: number = 0;

  @Output() goBack = new EventEmitter<any>();
  @Output() goNext = new EventEmitter<any>();

  constructor(private userService: UserService) {
    this.KycFormValidator();
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
      this.loadingKyc = false;
      this.KycFileName = this.userModel.verification_kyc;
    }, (error) => {
      console.log(error);
      this.loadingKyc = false;
    });
  }


  // ============================
  // READ IMAGE FILE FOR KYC FORM
  // ============================
  fileChangeKyc($event) {
    this.loadingKyc = true;
    let fileList: FileList = $event.target.files;
    if (fileList.length > 0) {
      this.KycFileName = fileList[0].name;
      this.KycFileSize = fileList[0].size;

      if (this.KycFileSize >= 10485760) {
        // if (this.IdCardFileSize >= 5242880) {
        this.KycForm.controls['file'].setErrors({'maxsize': true});
      }

      if  (!this.isImage(fileList[0])) {
        this.KycForm.controls['file'].setErrors({'badformat': true});
      }
    } else {
      this.KycFileName = 'No file chosen';
      this.base64Image = '';
      this.loadingKyc = false;
      return;
    }
    this.readImageKyc($event.target);
  }

  readImageKyc(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Image = myReader.result;
      // console.log(this.base64Image);
      this.loadingKyc = false;
    };
    myReader.readAsDataURL(file);
  }


  submitKycForm(event) {
    event.preventDefault();

    const controls = this.KycForm.controls;

    if (this.KycForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.loadingKyc = true;
    this.userService.updateUserKycProfile(this.base64Image).subscribe((data) => {
      // console.log(data);
      this.loadingKyc = false;
      this.successKycTip = true;
      setTimeout((() => this.successKycTip = false), 1000);
      setTimeout((() => this.goNext.emit()), 1250);
    }, (error) => {
      console.log(error);
      this.loadingKyc = false;
    });
  }

  KycFormValidator() {
    this.KycForm = new FormGroup({
      file: new FormControl('',    [
        FileValidator.validate
      ])
    });
  }

  isImage(file) {
    return file['type'].split('/')[0] === 'image'; // returns true or false
  }

}
