import { Injectable } from '@angular/core';
import { Url } from '../classes/base-url';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { ɵparseCookieValue } from '@angular/common';
import { Router } from '@angular/router';
import { error } from 'jquery';

axios.defaults.withCredentials=true;

@Injectable({
  providedIn: 'root'
})


export class AutServiceService {
  
  Url  = new Url();
  constructor(private http:HttpClient, private router: Router) { }
 
getCookie(name:string): string{
  let cookie="";
  const value = `; ${document.cookie}`;
  let parts: any;
  parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    cookie= parts.pop().split(';').shift();
  }
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
    console.log(this.Url);

      await axios.get(Url.COMPAGNY_URL + '/sanctum/csrf-cookie').then(response=>{
        console.log("Token",response.config.headers)
        axios.post(Url.BASE_URL + '/api/v1/register',registerform)
    })
  }

    
   async login(loginform:any){

      console.log(loginform);
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'accept': 'application/json' });
      await axios.post(Url.COMPAGNY_URL + '/login',loginform).then((response)=>{
        localStorage.removeItem('userInfo');
        const companyString= JSON.stringify(response.data)
        localStorage.setItem('userInfo',companyString);
        console.log("0",localStorage.getItem('userInfo'));
        // this.router.navigate(['homeadmin'])
      })
    }
}
