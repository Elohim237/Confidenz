import { Injectable } from '@angular/core';
import axios from 'axios';
axios.defaults.withCredentials=true;
import { BaseUrl } from '../classes/base-url';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
axios.defaults.withCredentials=true;
@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeService {

  constructor() { }
  baseUrl  = new BaseUrl();
  // compagnInfo:any;
  // storeData:any;
  // ngOnInit(){
  //   this.storeData=localStorage.getItem("userInfo")
  //   this.compagnInfo=JSON.parse(this.storeData);

  //   console.log(this.compagnInfo);
  // }
  createEmployeFile(compagnies:any,file:any){
    console.log(compagnies);
    console.log(file);
    let BearerToken= 'Bearer '+compagnies.token
    console.log(BearerToken);
    
    axios.post(this.baseUrl.url+'/api/v1/'+compagnies.compagny.id+'/upload/employees',file,{
      withCredentials: true,
      headers: {
        'Authorization': BearerToken,
        'Content-Type': 'multipart/form-data'
      }
      
    }).catch((response)=>{
      console.log(response);
      
    })
  }
}
