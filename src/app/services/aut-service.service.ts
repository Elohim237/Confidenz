import { Injectable } from '@angular/core';
import { BaseUrl } from '../classes/base-url';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import axios from 'axios';

axios.defaults.withCredentials=true;
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


 async register(registerform:any){
    console.log(registerform);
    console.log(this.baseUrl);
    axios.defaults.withCredentials=true;
    // await axios.get(this.baseUrl.url+"/sanctum/csrf-cookie", {
    //   headers: {
    //     'content-type': 'application/json',
    //     'accept': 'application/json'
    //   }
    // }).then(() => { const value = `; ${document.cookie}`;
    // let cookie = "";
    // let parts:any;
    // parts = value.split(`; ${name}=`);
    // if (parts.length === 2) {
    //   cookie = parts.pop().split(';').shift();
    //  }})
    await axios.get(this.baseUrl.url+'/sanctum/csrf-cookie').then(response=>{
      console.log("Token",response.config.headers)
          axios.post(this.baseUrl.url+'/register',registerform)
    })

  }

    
   async login(loginform:any){
      console.log(loginform);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json' });
      await axios.post(this.baseUrl.url+'/login',loginform)
    }
}
