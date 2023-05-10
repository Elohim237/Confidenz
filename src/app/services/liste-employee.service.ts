import { Injectable } from '@angular/core';
import { Url } from '../classes/base-url';
import axios from 'axios';
import { Observable } from 'rxjs';

axios.defaults.withCredentials=true;
@Injectable({
  providedIn: 'root'
})
export class ListeEmployeeService {

  constructor() { }
  Url  = new Url();
  // getlisteEmploye(compagnies:any):Observable<any>{
  //   let BearerToken= 'Bearer '+compagnies.token;
  //   return new Observable<any>((observer)=>{ 
  //     axios.post(Url.BASE_URL + '/api/v1/'+compagnies.compagny.id + '/employees',{
  //       withCredentials: true,
  //       headers: {
  //         'Authorization': BearerToken
  //       }
  //     }).then((response)=>{
  //       console.log(response);
  //       observer.next(response);
  //       observer.complete();
  //     })
  //   });
  // }
 
}