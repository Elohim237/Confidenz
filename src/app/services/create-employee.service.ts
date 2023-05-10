import { Injectable } from '@angular/core';
import axios from 'axios';
axios.defaults.withCredentials=true;
import { Url } from '../classes/base-url';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';
axios.defaults.withCredentials=true;
@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeService {
  create=false;
  constructor() { }
  Url  = new Url();
  createEmployeFile(compagnies:any,file:any){
    console.log(compagnies);
    console.log(file);
    let BearerToken= 'Bearer '+compagnies.token
    console.log(BearerToken);
    
    axios.post(Url.BASE_URL + '/api/v1/'+compagnies.compagny.id+'/upload/employees',file,{
      withCredentials: true,
      headers: {
        'Authorization': BearerToken,
        'Content-Type': 'multipart/form-data'
      }
      
    }).catch((response)=>{
      console.log(response);
      
    })
  }

  CreateEmployeByForm(compagnies:any,formData:any){
    let BearerToken= 'Bearer '+compagnies.token;
    axios.post(Url.BASE_URL + '/api/v1/'+compagnies.compagny.id+'/employee/register',formData,{
      withCredentials: true,
      headers: {
        'Authorization': BearerToken,
        'Content-Type': 'multipart/form-data'
      }
      
    }).then((response)=>{
      console.log(response)
      if(response.status==201){
         this.create=true;
         console.log(this.create)
      }
    })

  }
  getCreate(){
    return this.create;
  }
}
