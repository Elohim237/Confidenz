import { Injectable } from '@angular/core';
import { URL } from '../classes/base-url';
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

  constructor(private http:HttpClient, private router: Router) { }
 
// getCookie(name:string): string{
//   let cookie="";
//   const value = `; ${document.cookie}`;
//   let parts: any;
//   parts = value.split(`; ${name}=`);
//   if (parts.length === 2) {
//     cookie= parts.pop().split(';').shift();
//   }
//   return cookie;
  
// }
//  request(url:any, options:any) {
//     //get cookie
//     let csrfToken:string;
//     csrfToken = this.getCookie('XSRF-TOKEN');
//     console.log(decodeURIComponent(csrfToken));
//     // return null;
//     return fetch(url, {
//       headers: {
//         'content-type': 'application/json',
//         'accept': 'application/json',
//         'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
//       },
//       credentials: 'include',
//       ...options,
//     });
//   }


  async register(registerform:any){
    console.log(registerform);
    axios.post(URL.COMPAGNY_URL + '/register', registerform).then((response) => {
      console.log(response)
    })
  }

    
   async login(loginform: any){

      console.log('Login Form: ' + loginform);
      const headers = new HttpHeaders({ 
        'Content-Type': 'application/json', 
        'accept': 'application/json' 
      });

      await axios.post(URL.COMPAGNY_URL + '/login',loginform).then((response) => {
        localStorage.removeItem('userInfo');
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        console.log("userInfo : ", localStorage.getItem('userInfo'));
        // this.router.navigate(['homeadmin'])
      })
    }
}
