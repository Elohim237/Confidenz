import { Injectable } from '@angular/core';
import { URL } from '../classes/base-url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { Router } from '@angular/router';

axios.defaults.withCredentials = true;

@Injectable({
  providedIn: 'root'
})


export class AutServiceService {
  message!: string;

  constructor(private http: HttpClient, private router: Router) { }

  async register(registerform: any) {
    // console.log(registerform);
    axios.post(URL.COMPAGNY_URL + '/register', registerform).then((response) => {
      // console.log(response)
    })
  }


  async login(loginform: any, url: string) {
    // console.log('Login Form: ' + loginform);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json'
    });

    await axios.post(url + '/login', loginform).then((response) => {
      sessionStorage.setItem('url', url);
      sessionStorage.setItem('userInfo', JSON.stringify(response.data));
      this.router.navigate(['/'])
    })
  }


  setMessageCreation(message: string) {
    this.message = message;
  }
  getMessageCreation() {
    return this.message;
  }
}
