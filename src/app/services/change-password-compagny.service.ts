import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordCompagnyService {
  message!: string;
  constructor() { }

  changePassword(compagny: any, formdata: any) {
    axios.post(URL.COMPAGNY_URL + '/' + '/update-password', formdata, {
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + compagny.authorization.token,
      }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error(error);
    })
  }
  setMessage(message: string) {
    this.message = message;
  }
  getMessage() {
    return this.message;
  }
}
