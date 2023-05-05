import { Injectable } from '@angular/core';
import { BaseUrl } from '../classes/base-url';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutServiceService {
  baseUrl  = new BaseUrl();
  constructor(private http:HttpClient) { }
  
  getCookie(name:any) {
    const value = `; ${document.cookie}`;
    let parts:any;
    parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

 request(url:any, options:any) {
    //get cookie
    let csrfToken:any;
    csrfToken = this.getCookie('XSRF-TOKEN');
    // console.log(decodeURIComponent(csrfToken));
    // return null;
    return fetch(url, {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
      },
      credentials: 'include',
      ...options,
    });
  }


 async register(registerform:any){
    console.log(registerform);
    console.log(this.baseUrl);
    return this.request(this.baseUrl.url+ '/register', {
      method: "POST",
      body: registerform
    })
  }
}
