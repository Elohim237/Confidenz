import { Component } from '@angular/core';
import { ChangePasswordCompagnyService } from '../services/change-password-compagny.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent {
  admin: boolean = JSON.parse(sessionStorage.getItem('admin')!);
  isChecked: boolean = false;
  buttonEnabled: boolean = false;
  storeData: any;
  userInfo: any;
  loader: Boolean = false;
  updatePassword: Boolean = false;
  errorPassword: Boolean = false;
  supprimeloader: Boolean = false;
  messagePasswordGood!: string;
  errorMessage!: string;
  deleteAccountMessage!: string;
  passwordForm: FormGroup;
  ShowNavbar = false;
  // passwordForm = new FormGroup({
  //   OldPassword: new FormControl(),
  //   NewPassword:  new FormControl(),
  //   RetapePassword:   new FormControl(),
  // });
  constructor(private changePasswordService: ChangePasswordCompagnyService, private router: Router) {
    this.passwordForm = new FormGroup({
      OldPassword: new FormControl('', Validators.required),
      NewPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      RetapePassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }
  ngOnInit() {
    this.storeData = sessionStorage.getItem("userInfo")
    this.userInfo = JSON.parse(this.storeData);
  }
  updateButtonState() {
    this.buttonEnabled = this.isChecked;
  }

  submitPassword() {
    if (this.passwordForm.invalid) {
      console.error("Champs du formulaire invalides.");
      return;
    }
    let formdata = new FormData();
    formdata.append('old_password', this.passwordForm.value.OldPassword)
    formdata.append('password', this.passwordForm.value.NewPassword)
    formdata.append('password_confirmation', this.passwordForm.value.RetapePassword)
    this.loader = true;
    axios.post(sessionStorage.getItem('url') + '/update-password', formdata, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.userInfo.authorization.token,
      }
    }).then((response) => {
      // console.log(response)
      this.loader = false
      this.updatePassword = true;
      this.messagePasswordGood = response.data.message;
    }).catch((error) => {
      this.loader = false;
      this.errorPassword = true;
      let errorcombinate;
      errorcombinate = error.response.data.message.password + ' et ' + error.response.data.message.password_confirmation
      this.errorMessage = error.response.data.message ?? errorcombinate
      console.error(error);

    })
  }
  deletedAccount() {
    this.supprimeloader = true;
    let BearerToken = 'Bearer ' + this.userInfo.authorization.token;
    axios.delete(sessionStorage.getItem('url') + '/' + this.userInfo.compagny.id + '/delete', {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.userInfo.authorization.token,
      }
    }).then((response) => {
      this.supprimeloader = false;
      this.deleteAccountMessage = response.data.message;
      this.changePasswordService.setMessage(this.deleteAccountMessage)
      this.router.navigate(['/'])
    }).catch((error) => {
      this.supprimeloader = false
      // console.log('Delete error:', error)
    })
  }
}

