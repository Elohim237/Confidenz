import { Component } from '@angular/core';
import { ListeEmployeeService } from '../services/liste-employee.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import axios from 'axios';
import { Url } from '../classes/base-url';
@Component({
  selector: 'app-liste-employee',
  templateUrl: './liste-employee.component.html',
  styleUrls: ['./liste-employee.component.css']
})
export class ListeEmployeeComponent {
  storeData:any;
  userInfo:any;
  compagnInfo:any;
  Url  = new Url();
  donnees: any[] = [];
  subscription!: Subscription; 

  constructor(private listeEmployeService: ListeEmployeeService){}
  ngOnInit(){
    this.storeData=localStorage.getItem("userInfo")
    this.userInfo=JSON.parse(this.storeData);
    this.compagnInfo=JSON.parse(this.storeData);
    console.log(this.userInfo);
    let response=this.getlisteEmploye(this.compagnInfo);
    console.log(response);
    
  //   this.listeEmployeService.getlisteEmploye(this.compagnInfo).pipe(
  //     tap((data)=>{
  //       console.log(data);
  //     })
  //   ).subscribe();
   
  // }
}
getlisteEmploye(compagnies:any){
    let BearerToken= 'Bearer '+compagnies.token;
    axios.post(Url.BASE_URL + '/api/v1/'+compagnies.compagny.id+'/employees',{
            withCredentials: true,
            headers: {
              'Authorization': BearerToken
            }
  })
  
}

}
