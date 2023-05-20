import { Component , ViewChild, TemplateRef, OnInit} from '@angular/core';
import { ListeEmployeeService } from '../services/liste-employee.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import axios from 'axios';
import { URL } from '../classes/base-url';
import * as $ from 'jquery';
import 'bootstrap-table';
@Component({
  selector: 'app-liste-employee',
  templateUrl: './liste-employee.component.html',
  styleUrls: ['./liste-employee.component.css']
})
export class ListeEmployeeComponent implements OnInit{
  storeData:any;
  userInfo:any;
  compagnInfo:any;
  employees:Array<any>=[];
  subscription!: Subscription; 
  tableOptions:any;
  deleted=false;
  BearerToken!:string;
  actionDelete=false;
  constructor(private listeEmployeService: ListeEmployeeService){}
  
  dataa:Array<any>=[];
  ngOnInit(){

    //this.dataa.push(this.employees);
    // this.data=this.employees;
    this.storeData=localStorage.getItem("userInfo")
    this.userInfo=JSON.parse(this.storeData);
    console.log(this.userInfo);
    this.BearerToken= 'Bearer '+this.userInfo.authorization.token;

    this.getlisteEmploye(this.userInfo);
   
}


getlisteEmploye(compagnies:any){
   console.log("yo",compagnies)
    axios.get(URL.COMPAGNY_URL+ '/'+compagnies.compagny.id+'/employees',{
            withCredentials: true,
            headers: {
              'Authorization': this.BearerToken
            }
  }).then((response)=>{

    console.log("reponse",response);

    this.employees=response.data.employees;

  }).catch((error)=>{
    console.log(error)
  })
  
}
  deletedEmployee(compagnies:any,idEmployee:any){
    this.actionDelete=true;
      axios.delete(URL.COMPAGNY_URL+'/'+compagnies.compagny.id+'/employees/'+idEmployee,{
        withCredentials: true,
        headers: {
          'Authorization': this.BearerToken
        }
      }).then((response)=>{
        console.log(response);
        window.location.reload()
        this.deleted=true
      })
  }

}
