import { Injectable } from '@angular/core';
import { BaseUrl } from '../classes/base-url';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AutServiceService {
  baseUrl  = new BaseUrl();
  constructor(private http:HttpClient) { }
 
  getCookie(name:string): string {
    let cookie = "";
    fetch(this.baseUrl.url+'/sanctum/csrf-cookie', {
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      }, 
      credentials: 'include'
    }).then(() => {
      const value = `; ${document.cookie}`;
      let parts:any;
      parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        cookie = parts.pop().split(';').shift();
      }
    });
    return cookie;
  }

 request(url:any, options:any) {
    //get cookie
    let csrfToken:string;
    csrfToken = this.getCookie('XSRF-TOKEN');
    console.log(decodeURIComponent(csrfToken));
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


 register(registerform:any){
    console.log(registerform);
    console.log(this.baseUrl);
    // return request(BASE_URL + '/register', {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: "Mr Claude SA",
    //     email: "fotso1claude@gmail.com",
    //     password: "fotso1claude",
    //     password_confirmation: "fotso1claude"
    //   })
    // })
    const options = {
      withCredentials: true
    };
  //   return this.http.post(this.baseUrl.url+'/register',this.request(this.baseUrl.url+ '/register', {
  //     method: "POST",
  //     body: registerform
  //   }),options)
  // }
  return this.request(this.baseUrl.url+'/register', {
      method: "POST",
      body: registerform
      })
    }


    login(loginform:any){
      console.log(loginform);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json' });
      return this.http.post(this.baseUrl.url+'/login',loginform,{headers})
    }
}
