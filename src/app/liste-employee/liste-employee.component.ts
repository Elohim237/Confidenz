import { Component , ViewChild, TemplateRef, OnInit} from '@angular/core';
import { ListeEmployeeService } from '../services/liste-employee.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import axios from 'axios';
import { Url } from '../classes/base-url';
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
  Url  = new Url();
  employees:Array<any>=[];
  subscription!: Subscription; 
  tableOptions:any;
  deleted=false;
  BearerToken!:string;
  actionDelete=false;
  constructor(private listeEmployeService: ListeEmployeeService){}
  
  dataa:Array<any>=[];
  ngOnInit(){
    this.tableOptions={
      data: this.employees
    }
     $(document).ready(() => {
      $('.table').bootstrapTable({
        data:this.employees,
        
      });
    });
    this.dataa.push(this.employees);
    // this.data=this.employees;
    this.storeData=localStorage.getItem("userInfo")
    this.userInfo=JSON.parse(this.storeData);
    console.log(this.userInfo);
    this.getlisteEmploye(this.userInfo);
    this.BearerToken= 'Bearer '+this.userInfo.token;
}


getlisteEmploye(compagnies:any){
   
    axios.post(Url.COMPAGNY_URL+ '/'+compagnies.compagny.id+'/employees',{
            withCredentials: true,
            headers: {
              'Authorization': this.BearerToken
            }
  }).then((response)=>{

    console.log(response.data.datas.employees);

    this.employees=response.data.datas.employees;

  })
  
}
  deletedEmployee(compagnies:any,idEmployee:any){
    this.actionDelete=true;
      axios.delete(Url.COMPAGNY_URL+'/'+compagnies.compagny.id+'/employees/'+idEmployee,{
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
