import { Injectable } from '@angular/core';
import axios from 'axios';
import { URL } from '../classes/base-url';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordCompagnyService {
  message!:string;
  constructor() { }

 changePassword(compagny:any,formdata:any){
  console.log(compagny)
    let BearerToken= 'Bearer '+compagny.authorization.token;
      axios.post(URL.COMPAGNY_URL+'/'+compagny.compagny.id+'/update-password', formdata,{
        withCredentials: true,
        headers: {
          'Authorization': BearerToken,
        }
      }).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error);
        
      })
  }
  setMessage(message:string){
    this.message=message;
  }
  getMessage(){
    return this.message;
  }
}
